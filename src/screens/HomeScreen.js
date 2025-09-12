
// src/screens/HomeScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

import { useAuth } from '../hooks/useAuth';
import { formatPoints, calculateNextReward, canRedeemReward } from '../utils/validation';
import QRCodeDisplay from '../components/common/QRCodeDisplay';
import InfoRowCard from '../components/common/InfoRowCard';
import SideMenu from '../components/common/SideMenu';
import stylesHome from '../style/HomeScreenStyle';

const HomeScreen = ({ onNavigate }) => {
  const { user, userData, loading, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [askedPhone, setAskedPhone] = useState(false);

  const handleSignOut = async () => {
    const result = await logout();
    if (result.success) {
      Alert.alert('Sucesso!', 'Você foi desconectado.');
    } else {
      Alert.alert('Erro ao Sair', result.error);
    }
  };

  const handleSettings = () => {
    onNavigate && onNavigate('SettingsScreen');
  };

  const menuItems = [
    {
      title: 'Settings',
      icon: 'settings',
      onPress: handleSettings
    },
    ...(userData?.role === 'merchant' ? [
      {
        title: 'Painel do Lojista',
        icon: 'briefcase',
        onPress: () => onNavigate && onNavigate('LojistaHomeScreen')
      },
      {
        title: 'Aplicar Pontos/Fichas',
        icon: 'target',
        onPress: () => onNavigate && onNavigate('LojistaScreen')
      }
    ] : []),
    {
      title: 'Logout',
      icon: 'log-out',
      onPress: handleSignOut
    }
  ];

  // Efeito precisa ficar antes de qualquer retorno condicional para manter a ordem dos hooks
  useEffect(() => {
    if (!loading && userData && !askedPhone) {
      const hasPhone = !!(userData.phone && String(userData.phone).trim());
      if (!hasPhone) {
        setAskedPhone(true);
        Alert.alert(
          'Completar cadastro',
          'Por favor, adicione seu telefone para contato.',
          [
            { text: 'Agora não' },
            { text: 'Ir para Configurações', onPress: () => onNavigate && onNavigate('SettingsScreen') },
          ]
        );
      }
    }
  }, [loading, userData, askedPhone]);

  if (loading) {
    return (
      <View style={stylesHome.loadingContainer}>
        <Text style={stylesHome.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const pontosAtuais = userData?.pontosFidelidade || 0;
  const pontosRestantes = calculateNextReward(pontosAtuais);
  const podeResgatar = canRedeemReward(pontosAtuais);
  const participacoes = userData?.sorteiosParticipados || [];
  const sorteiosDistintos = Array.isArray(participacoes)
    ? new Set(participacoes.map((p) => p?.raffleId).filter((id) => !!id)).size
    : 0;

  // (efeito movido para cima para não quebrar ordem dos hooks)

  return (
    <View style={stylesHome.mainContainer}>
      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        menuItems={menuItems}
        title="Menu"
      />

      <ScrollView style={stylesHome.scrollContainer}>
        <View style={stylesHome.container}>
          {/* Header com informações do usuário */}
          <View style={stylesHome.headerContainer}>
            <View style={stylesHome.userInfoContainer}>
              <View style={stylesHome.avatarContainer}>
                <Text style={stylesHome.avatarText}>
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                </Text>
              </View>
              <View style={stylesHome.userTextContainer}>
                <Text style={stylesHome.userNameText}>
                  Nome: {userData?.name || 'Carregando...'}
                </Text>
                <Text style={stylesHome.userEmailText}>
                  Email: {userData?.email || 'Carregando...'}
                </Text>
              </View>
            </View>
            
            {/* Botão do menu hambúrguer */}
            <TouchableOpacity 
              style={stylesHome.menuButton}
              onPress={() => setMenuVisible(true)}
            >
              <View style={stylesHome.menuIcon}>
                <View style={stylesHome.menuLine} />
                <View style={stylesHome.menuLine} />
                <View style={stylesHome.menuLine} />
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={stylesHome.headerLine} />

          {/* QR Code Section */}
          <QRCodeDisplay
            value={`${user?.uid}`}
            title="Seu QR Code de Fidelidade"
            instruction="Mostre este QR Code na loja para acumular pontos!"
          />

          
          {/* Cartões em linha no estilo do mock */}
          <InfoRowCard
            title="Pontos"
            value={formatPoints(pontosAtuais)}
            description={
              podeResgatar
                ? 'Você pode resgatar uma recompensa!'
                : `Faltam ${pontosRestantes} pontos para a sua próxima recompensa!`
            }
            thumbnailSource={require('../../assets/box-gift.png')}
          />

          <InfoRowCard
            title="Sorteios"
            value={`${sorteiosDistintos}`}
            description={`Você já participou de ${sorteiosDistintos} sorteio${sorteiosDistintos === 1 ? '' : 's'}.`}
            thumbnailSource={require('../../assets/box-sorteios.png')}
          />
        </View>
      </ScrollView>
    </View>
  
  );
};

export default HomeScreen;


