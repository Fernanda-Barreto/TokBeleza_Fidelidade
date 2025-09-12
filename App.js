
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from './src/hooks/useAuth';
import LoginScreen from './src/screens/LoginScreen'; 
import CadastroScreen from './src/screens/CadastroScreen'; 
import HomeScreen from './src/screens/HomeScreen';
import LojistaScreen from './src/screens/LojistaScreen';
import LojistaHomeScreen from './src/screens/LojistaHomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default function App() {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = React.useState('LoginScreen');

  // Navegação entre telas
  const handleNavigate = (screenName) => {
    setCurrentScreen(screenName);
  };

  // Efeito para navegar automaticamente baseado no estado de autenticação
  useEffect(() => {
    if (!loading) {
      if (user) {
        setCurrentScreen('HomeScreen');
      } else {
        setCurrentScreen('LoginScreen');
      }
    }
  }, [user, loading]);

  // Renderizar tela de carregamento
  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.loadingContainer}>
          <StatusBar style="auto" />
          <ActivityIndicator size="large" color="#666" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Renderizar a tela atual
  const renderScreen = () => {
    switch (currentScreen) {
      case 'LoginScreen':
        return <LoginScreen onNavigate={handleNavigate} />;
      case 'CadastroScreen':
        return <CadastroScreen onNavigate={handleNavigate} />;
      case 'HomeScreen':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'SettingsScreen':
        return <SettingsScreen onNavigate={handleNavigate} />;
      case 'LojistaHomeScreen':
        return <LojistaHomeScreen onNavigate={handleNavigate} />;
      case 'LojistaScreen':
        return <LojistaScreen onNavigate={handleNavigate} />;
      default:
        return <LoginScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        {renderScreen()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 20,
    color: '#666',
  },
});
