// src/screens/LojistaHomeScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { db } from '../../firebaseConfig';
import { listenRafflesByCreator, createRaffle, updateRaffleStatus, deleteRaffle } from '../utils/raffles';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { collection, getDocs } from 'firebase/firestore';
import Input from '../components/common/Input';
import stylesLojistaHome from '../style/LojistaHomeScreenStyle';

const LojistaHomeScreen = ({ onNavigate }) => {
  const { user } = useAuth();
  const [raffles, setRaffles] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const unsub = listenRafflesByCreator(db, user.uid, setRaffles, (err) => console.error(err));
    setLoading(false);
    return () => unsub && unsub();
  }, [user]);

  const handleCreate = async () => {
    try {
      if (!newTitle.trim()) return Alert.alert('Atenção', 'Informe um título');
      await createRaffle(db, user.uid, { title: newTitle, description: newDesc });
      setNewTitle('');
      setNewDesc('');
    } catch (e) {
      Alert.alert('Erro', e?.message || 'Não foi possível criar o sorteio');
    }
  };

  const toggleStatus = async (raffleId, current) => {
    const next = current === 'open' ? 'finalized' : 'open';
    try {
      await updateRaffleStatus(db, raffleId, next);
    } catch (e) {
      Alert.alert('Erro', e?.message || 'Não foi possível atualizar o status');
    }
  };

  const confirmDelete = (raffleId) => {
    Alert.alert(
      'Excluir sorteio',
      'Esta ação não pode ser desfeita. Deseja excluir o sorteio finalizado?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: async () => {
            try {
              await deleteRaffle(db, raffleId);
            } catch (e) {
              Alert.alert('Erro', e?.message || 'Não foi possível excluir o sorteio');
            }
          }
        }
      ]
    );
  };

  const exportParticipantsCsv = async (raffleId) => {
    try {
      // Carrega todos os usuários e filtra participações do sorteio
      const snap = await getDocs(collection(db, 'users'));
      const participants = [];
      snap.forEach((d) => {
        const data = d.data();
        const entries = (data.sorteiosParticipados || []).filter((p) => p.raffleId === raffleId);
        const participacoes = entries.reduce((acc, cur) => acc + (Number(cur.tickets) || 0), 0);
        if (participacoes > 0) {
          participants.push({
            uid: d.id,
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            participacoes,
          });
        }
      });

      if (participants.length === 0) {
        Alert.alert('Sem participantes', 'Não há participações registradas neste sorteio.');
        return;
      }

      // Ordena por quantidade de participações (desc)
      participants.sort((a, b) => b.participacoes - a.participacoes);

      // Gera CSV
      const header = 'Nome,E-mail,Telefone,Participacoes\n';
      const rows = participants.map((p) => {
        const safe = (v) => '"' + String(v || '').replace(/"/g, '""') + '"';
        return [safe(p.name), safe(p.email), safe(p.phone), p.participacoes].join(',');
      });
      const csv = header + rows.join('\n');
      const fileUri = FileSystem.cacheDirectory + `participantes_${raffleId}.csv`;
      await FileSystem.writeAsStringAsync(fileUri, csv);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, { mimeType: 'text/csv', dialogTitle: 'Baixar Planilha de Participantes' });
      } else {
        Alert.alert('Arquivo gerado', `Salvo em: ${fileUri}`);
      }
    } catch (e) {
      Alert.alert('Erro', e?.message || 'Falha ao gerar a planilha.');
    }
  };

  return (
    <View style={stylesLojistaHome.container}>
      <View style={stylesLojistaHome.header}>
        <TouchableOpacity onPress={() => onNavigate('HomeScreen')} style={stylesLojistaHome.backButton}>
          <Feather name="chevron-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={stylesLojistaHome.title}>Painel do Lojista</Text>
      </View>

      <ScrollView contentContainerStyle={stylesLojistaHome.content}>
        <Text style={stylesLojistaHome.sectionTitle}>Criar Sorteio</Text>
        <Input
          placeholder="Digite o título"
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <Input
          placeholder="Descrição (opcional)"
          value={newDesc}
          onChangeText={setNewDesc}
          multiline
          style={{ height: 100, textAlignVertical: 'top' }}
        />
        <View style={stylesLojistaHome.createRow}>
          <TouchableOpacity style={stylesLojistaHome.smallPrimaryButton} onPress={handleCreate}>
            <Text style={stylesLojistaHome.smallPrimaryButtonText}>Criar Sorteio</Text>
          </TouchableOpacity>
        </View>

        <Text style={[stylesLojistaHome.sectionTitle, { marginTop: 20 }]}>Meus Sorteios</Text>
        {raffles.map((r) => (
          <View key={r.id} style={stylesLojistaHome.raffleRow}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={stylesLojistaHome.raffleStatus}>{r.status === 'open' ? 'Aberto' : 'Finalizado'}</Text>
              <Text style={stylesLojistaHome.raffleTitle}>{r.title}</Text>
              {!!r.description && <Text style={stylesLojistaHome.raffleDesc}>{r.description}</Text>}
            </View>
            <View style={{ gap: 6 }}>
              <TouchableOpacity style={stylesLojistaHome.listButton} onPress={() => toggleStatus(r.id, r.status)}>
                <Text style={stylesLojistaHome.listButtonText}>{r.status === 'open' ? 'Finalizar' : 'Reabrir'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesLojistaHome.downloadButton} onPress={() => exportParticipantsCsv(r.id)}>
                <Text style={stylesLojistaHome.downloadButtonText}>Baixar Participantes</Text>
              </TouchableOpacity>
              {r.status === 'finalized' && (
                <TouchableOpacity style={[stylesLojistaHome.downloadButton, { backgroundColor: '#dc3545' }]} onPress={() => confirmDelete(r.id)}>
                  <Text style={[stylesLojistaHome.downloadButtonText, { color: '#fff' }]}>Excluir</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default LojistaHomeScreen;



