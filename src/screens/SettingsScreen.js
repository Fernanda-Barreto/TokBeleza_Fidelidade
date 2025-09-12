import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import { validatePhone } from '../utils/validation';

const SettingsScreen = ({ onNavigate }) => {
  const { user, userData } = useAuth();
  const [phone, setPhone] = useState(userData?.phone || '');
  const [isSaving, setIsSaving] = useState(false);

  const savePhone = async () => {
    if (!validatePhone(phone)) {
      Alert.alert('Telefone inválido', 'Informe um telefone com DDD (10 a 11 dígitos).');
      return;
    }
    if (!user?.uid) return;
    try {
      setIsSaving(true);
      await updateDoc(doc(db, 'users', user.uid), { phone: String(phone).trim() });
      Alert.alert('Pronto!', 'Telefone atualizado.');
      onNavigate && onNavigate('HomeScreen');
    } catch (e) {
      Alert.alert('Erro', e?.message || 'Falha ao atualizar telefone');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('HomeScreen')} style={styles.backButton}>
          <Feather name="chevron-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Configurações</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <Input
          placeholder="Telefone (com DDD)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.saveButton} onPress={savePhone} disabled={isSaving}>
          <Text style={styles.saveButtonText}>{isSaving ? 'Salvando...' : 'Salvar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, flexDirection: 'row', alignItems: 'center', gap: 8 },
  backButton: { paddingVertical: 6, paddingRight: 8 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  content: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  saveButton: { backgroundColor: '#eb8b47', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  saveButtonText: { color: '#000', fontWeight: '700', fontSize: 16 },
});

export default SettingsScreen;


