// firebaseConfig.js na raiz do seu projeto

// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; // <--- ADICIONANDO FIRESTORE

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Suas configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBOdPTR9oY_nJdwcEu5Oyrm2qjXZMterTk",
  authDomain: "fidelidadedigitalapp.firebaseapp.com",
  projectId: "fidelidadedigitalapp",
  storageBucket: "fidelidadedigitalapp.firebasestorage.app",
  messagingSenderId: "239280406687",
  appId: "1:239280406687:web:18725d4b90950750f8e2aa"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa e EXPORTA o serviço de autenticação com persistência em AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializa e EXPORTA o Firestore
export const db = getFirestore(app); // <--- ADICIONANDO EXPORTAÇÃO DO FIRESTORE

// Você pode remover o "export default firebaseConfig;" pois não é usado diretamente
// export default firebaseConfig;
