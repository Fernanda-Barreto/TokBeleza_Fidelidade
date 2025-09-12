// src/screens/LojistaScreen.js

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView, StyleSheet, Platform, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, increment, arrayUnion, serverTimestamp, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { FIDELIDADE_CONFIG } from '../utils/constants';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import stylesLojista from '../style/LojistaScreenStyle';

const LojistaScreen = ({ onNavigate }) => {
  const { user } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [shouldScan, setShouldScan] = useState(false);
  const lastScanRef = useRef(0);
  const [customerInput, setCustomerInput] = useState('');
  const [selectedFidelidade, setSelectedFidelidade] = useState(false);
  const [selectedSorteio, setSelectedSorteio] = useState(false);
  const [pontos, setPontos] = useState('');
  const [tickets, setTickets] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [raffles, setRaffles] = useState([]);
  const [raffleId, setRaffleId] = useState('');
  const [customerPreview, setCustomerPreview] = useState(null);
  const POINTS_PER_REWARD = FIDELIDADE_CONFIG.PONTOS_POR_RECOMPENSA || 10;

  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) {
        await requestPermission();
      }
    })();
  }, [permission]);

  useEffect(() => {
    // Carrega sorteios abertos para seleção
    (async () => {
      try {
        const q = query(collection(db, 'raffles'), where('status', '==', 'open'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const items = [];
        snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
        setRaffles(items);
      } catch (e) {
        // Fallback sem orderBy (evita necessidade de índice composto)
        try {
          const q2 = query(collection(db, 'raffles'), where('status', '==', 'open'));
          const snap2 = await getDocs(q2);
          const items2 = [];
          snap2.forEach((d) => items2.push({ id: d.id, ...d.data() }));
          // Ordena manualmente se createdAt existir
          items2.sort((a, b) => {
            const aTs = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
            const bTs = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
            return bTs - aTs;
          });
          setRaffles(items2);
        } catch (_) {
          setRaffles([]);
        }
      }
    })();
  }, []);

  const extractUid = (raw) => {
    if (!raw) return '';
    try {
      // Se vier um link com ?uid=XYZ
      const url = new URL(raw);
      const uidFromQuery = url.searchParams.get('uid');
      if (uidFromQuery) return uidFromQuery;
    } catch (_) {
      // Não é URL, segue
    }
    // Caso contrário, assume que é o uid em texto puro
    return String(raw).trim();
  };

  const handleBarCodeScanned = useCallback(({ data }) => {
    const now = Date.now();
    if (now - lastScanRef.current < 1200) return; // throttle 1.2s
    lastScanRef.current = now;
    const uid = extractUid(data);
    setCustomerInput(uid);
    // carrega preview
    (async () => {
      try {
        const ref = doc(db, 'users', uid);
        const s = await getDoc(ref);
        setCustomerPreview(s.exists() ? { id: uid, ...s.data() } : null);
      } catch {
        setCustomerPreview(null);
      }
    })();
    setShouldScan(false);
    setScanning(false);
  }, []);

  const toggleFidelidade = () => setSelectedFidelidade((prev) => !prev);
  const toggleSorteio = () => setSelectedSorteio((prev) => !prev);

  const fetchCustomer = async (uidRaw) => {
    try {
      const uid = extractUid(uidRaw);
      if (!uid) return setCustomerPreview(null);
      const ref = doc(db, 'users', uid);
      const s = await getDoc(ref);
      setCustomerPreview(s.exists() ? { id: uid, ...s.data() } : null);
    } catch {
      setCustomerPreview(null);
    }
  };

  const validateAndBuildUpdate = async (uid) => {
    const trimmedUid = extractUid(uid);
    if (!trimmedUid) {
      return { ok: false, message: 'Informe ou escaneie um QR válido (UID).' };
    }

    if (!selectedFidelidade && !selectedSorteio) {
      return { ok: false, message: 'Escolha pelo menos uma opção: Fidelidade e/ou Sorteio.' };
    }

    const pontosNumber = selectedFidelidade ? Number(pontos) : 0;
    const ticketsNumber = selectedSorteio ? Number(tickets) : 0;

    if (selectedFidelidade && (!Number.isFinite(pontosNumber) || pontosNumber <= 0)) {
      return { ok: false, message: 'Quantidade de pontos inválida.' };
    }
    if (selectedSorteio && (!Number.isFinite(ticketsNumber) || ticketsNumber <= 0)) {
      return { ok: false, message: 'Quantidade de fichas inválida.' };
    }
    if (selectedSorteio && !raffleId) {
      return { ok: false, message: 'Selecione um sorteio para registrar as fichas.' };
    }

    // Verifica se usuário existe
    const userDocRef = doc(db, 'users', trimmedUid);
    const userSnap = await getDoc(userDocRef);
    if (!userSnap.exists()) {
      return { ok: false, message: 'Usuário não encontrado.' };
    }

    const updatePayload = { ultimaAtualizacao: serverTimestamp() };
    if (pontosNumber > 0) {
      updatePayload.pontosFidelidade = increment(pontosNumber);
    }
    if (ticketsNumber > 0) {
      updatePayload.sorteiosParticipados = arrayUnion({ createdAt: new Date().toISOString(), tickets: ticketsNumber, raffleId: raffleId || null });
    }

    return { ok: true, userDocRef, updatePayload, pontosNumber, ticketsNumber };
  };

  const handleAplicar = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (!user?.uid) {
        Alert.alert('Erro', 'Usuário não está logado');
        return;
      }
      
      // Verificar se o usuário logado tem role merchant
      const currentUserRef = doc(db, 'users', user.uid);
      const currentUserSnap = await getDoc(currentUserRef);
      
      if (!currentUserSnap.exists()) {
        Alert.alert('Erro', 'Documento do usuário não encontrado');
        return;
      }
      
      const userRole = currentUserSnap.data()?.role;
      
      if (userRole !== 'merchant') {
        Alert.alert('Erro', 'Apenas lojistas podem realizar esta operação');
        return;
      }
      
      const validation = await validateAndBuildUpdate(customerInput);
      if (!validation.ok) {
        Alert.alert('Atenção', validation.message);
        return;
      }

      await updateDoc(validation.userDocRef, validation.updatePayload);

      const msgs = [];
      if (validation.pontosNumber > 0) msgs.push(`+${validation.pontosNumber} pontos`);
      if (validation.ticketsNumber > 0) msgs.push(`+${validation.ticketsNumber} fichas`);
      const snapAfter = await getDoc(validation.userDocRef);
      const dataAfter = snapAfter.data();
      setCustomerPreview({ id: validation.userDocRef.id, ...dataAfter });
      const total = dataAfter?.pontosFidelidade ?? 0;
      Alert.alert('Sucesso', `Aplicado: ${msgs.join(' e ')}. Pontos do cliente: ${total}`);

      // Limpa quantidades mas mantém UID para repetir operação se desejar
      setPontos('');
      setTickets('');
    } catch (err) {
      console.error('Erro na aplicação:', err);
      Alert.alert('Erro', err?.message || 'Falha ao aplicar operação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResgatar = async () => {
    try {
      const uid = extractUid(customerInput);
      if (!uid) return Alert.alert('Atenção', 'Informe ou escaneie um cliente primeiro.');
      const ref = doc(db, 'users', uid);
      const s = await getDoc(ref);
      if (!s.exists()) return Alert.alert('Erro', 'Usuário não encontrado.');
      const current = Number(s.data()?.pontosFidelidade || 0);
      if (current < POINTS_PER_REWARD) {
        return Alert.alert('Ainda não disponível', `Cliente possui ${current} ponto(s). Precisa de ${POINTS_PER_REWARD}.`);
      }
      // Resgata o máximo possível em blocos do tamanho configurado e mantém o restante
      const remainder = current % POINTS_PER_REWARD;
      const redeemedCount = Math.floor(current / POINTS_PER_REWARD);
      await updateDoc(ref, {
        pontosFidelidade: remainder,
        ultimaAtualizacao: serverTimestamp(),
        recompensasResgatadas: increment(redeemedCount)
      });
      const after = await getDoc(ref);
      setCustomerPreview({ id: uid, ...after.data() });
      Alert.alert('Recompensa resgatada', `Resgatadas ${redeemedCount} recompensa(s). Pontos restantes: ${remainder}.`);
    } catch (e) {
      Alert.alert('Erro', e?.message || 'Falha ao resgatar.');
    }
  };

  return (
    <View style={stylesLojista.container}>
      <View style={stylesLojista.header}>
        <TouchableOpacity onPress={() => onNavigate('HomeScreen')} style={stylesLojista.backButton}>
          <Feather name="chevron-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={stylesLojista.title}>Modo Lojista</Text>
      </View>

      <ScrollView contentContainerStyle={stylesLojista.content}>
        <Text style={stylesLojista.sectionTitle}>1) Identificar Cliente</Text>

        <View style={stylesLojista.card}>
          {permission && permission.status === 'denied' ? (
            <Text style={stylesLojista.infoText}>Permissão de câmera negada. Você pode colar o link/UID abaixo.</Text>
          ) : (
            <>
              <TouchableOpacity style={stylesLojista.primaryButton} onPress={() => { setScanning(true); setTimeout(() => setShouldScan(true), 250); }}>
                <Text style={stylesLojista.primaryButtonText}>Ler QR Code</Text>
              </TouchableOpacity>

              <Modal
                visible={scanning}
                animationType="fade"
                transparent={false}
                onRequestClose={() => setScanning(false)}
              >
                <View style={stylesLojista.fullscreenScanner}>
                  <CameraView
                    facing="back"
                    barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                    onBarcodeScanned={shouldScan ? handleBarCodeScanned : undefined}
                    style={stylesLojista.cameraFill}
                  />
                  <TouchableOpacity style={[stylesLojista.outlineButton, { alignSelf: 'center', marginBottom: 20 }]} onPress={() => { setShouldScan(false); setScanning(false); }}>
                    <Text style={stylesLojista.outlineButtonText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </>
          )}

          <Text style={stylesLojista.helperText}>Ou cole o UID/link do QR:</Text>
          <Input
            value={customerInput}
            onChangeText={setCustomerInput}
            placeholder="UID do cliente ou link contendo ?uid=..."
            autoCapitalize="none"
            onBlur={() => fetchCustomer(customerInput)}
          />
          {customerPreview && (
            <View style={stylesLojista.previewBox}>
              <Text style={stylesLojista.previewText}>Cliente: {customerPreview.name || customerPreview.email || customerPreview.id}</Text>
              <Text style={stylesLojista.previewText}>Pontos atuais: {customerPreview.pontosFidelidade ?? 0}</Text>
            </View>
          )}
        </View>

        <Text style={stylesLojista.sectionTitle}>2) Ação</Text>
        <View style={stylesLojista.card}>
          <View style={stylesLojista.toggleRow}>
            <TouchableOpacity style={[stylesLojista.toggleButton, selectedFidelidade && stylesLojista.toggleSelected]} onPress={toggleFidelidade}>
              <Text style={[stylesLojista.toggleText, selectedFidelidade && stylesLojista.toggleTextSelected]}>Fidelidade</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[stylesLojista.toggleButton, selectedSorteio && stylesLojista.toggleSelected]} onPress={toggleSorteio}>
              <Text style={[stylesLojista.toggleText, selectedSorteio && stylesLojista.toggleTextSelected]}>Sorteio</Text>
            </TouchableOpacity>
          </View>

          {selectedFidelidade && (
            <View style={stylesLojista.fieldRow}>
              <Text style={stylesLojista.label}>Pontos:</Text>
              <TextInput
                value={pontos}
                onChangeText={setPontos}
                placeholder="0"
                keyboardType={Platform.select({ ios: 'number-pad', android: 'numeric' })}
                style={stylesLojista.inputSmall}
              />
            </View>
          )}

          {selectedSorteio && (
            <View style={stylesLojista.fieldRow}>
              <Text style={stylesLojista.label}>Fichas:</Text>
              <TextInput
                value={tickets}
                onChangeText={setTickets}
                placeholder="0"
                keyboardType={Platform.select({ ios: 'number-pad', android: 'numeric' })}
                style={stylesLojista.inputSmall}
              />
            </View>
          )}

          {selectedSorteio && (
            <View style={[stylesLojista.fieldRow, { alignItems: 'flex-start' }]}>
              <Text style={stylesLojista.label}>Sorteio:</Text>
              <View style={{ flex: 1 }}>
                {raffles.map((r) => (
                  <TouchableOpacity key={r.id} style={[stylesLojista.raffleItem, raffleId === r.id && stylesLojista.raffleItemSelected]} onPress={() => setRaffleId(r.id)}>
                    <Text style={[stylesLojista.raffleItemText, raffleId === r.id && stylesLojista.raffleItemTextSelected]}>{r.title}</Text>
                  </TouchableOpacity>
                ))}
                {raffles.length === 0 && (
                  <Text style={{ color: '#666' }}>Nenhum sorteio aberto</Text>
                )}
                {!!raffles.length && !raffleId && (
                  <Text style={{ color: '#b4743c', marginTop: 6 }}>Selecione um sorteio acima</Text>
                )}
              </View>
            </View>
          )}

          <View style={stylesLojista.actionsColumn}>
            <TouchableOpacity style={stylesLojista.primaryButton} onPress={handleAplicar} disabled={isSubmitting}>
              <Text style={stylesLojista.primaryButtonText}>{isSubmitting ? 'Aplicando...' : 'Aplicar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesLojista.redeemButton} onPress={handleResgatar}>
              <Text style={stylesLojista.redeemButtonText}>Resgatar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};



export default LojistaScreen;


