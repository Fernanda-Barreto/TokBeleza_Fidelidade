// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // busca dados do user no firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        
     
        const unsubscribeFirestore = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserData(doc.data());
          } else {
            setUserData(null);
          }
          setLoading(false);
        }, (error) => {
          
      
          if (error.code !== 'permission-denied') {
            console.error('Erro ao buscar dados do usuário:', error);
          }
          setLoading(false);
        });

        return () => unsubscribeFirestore();

      } else {
      
        setUserData(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (name, email, phone, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', result.user.uid), {
        name: name.trim(),
        email: email.trim(),
        phone: String(phone || '').trim(),
        role: 'customer',
        pontosFidelidade: 0,
        sorteiosParticipados: [],
        dataCriacao: new Date(),
        ultimaAtualizacao: new Date()
      });

      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    userData,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    isAuthenticated: !!user
  };
};