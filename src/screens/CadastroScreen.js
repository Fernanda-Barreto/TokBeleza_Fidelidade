// src/screens/CadastroScreen.js (Apenas o handleSignUp e o import de onNavigate, o resto permanece igual)

import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { validateEmail, validateSignUp, validatePhone } from '../utils/validation';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import stylesCadastro from '../style/CadastroScreenStyle';

const CadastroScreen = ({ onNavigate }) => {
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = {
    name: (value) => {
      if (!value.trim()) return 'Nome é obrigatório';
      if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
      return '';
    },
    email: (value) => {
      if (!value.trim()) return 'E-mail é obrigatório';
      if (!validateEmail(value)) return 'E-mail inválido. Use um e-mail real e válido.';
      return '';
    },
    phone: (value) => {
      if (!value.trim()) return 'Telefone é obrigatório';
      if (!validatePhone(value)) return 'Telefone inválido. Informe com DDD (10 a 11 dígitos).';
      return '';
    },
    password: (value) => {
      if (!value.trim()) return 'Senha é obrigatória';
      if (value.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
      return '';
    },
    confirmPassword: (value, allValues) => {
      if (!value.trim()) return 'Confirmação de senha é obrigatória';
      if (value !== allValues.password) return 'As senhas não coincidem';
      return '';
    }
  };

  const { values, errors, handleChange, handleBlur, validateForm } = useForm(
    { name: '', email: '', phone: '', password: '', confirmPassword: '' },
    validationSchema
  );

  const handleSignUp = async () => {
    const { isValid } = validateForm();
    
    if (!isValid) {
      Alert.alert('Erro no Cadastro', 'Por favor, corrija os erros no formulário.');
      return;
    }

    setIsLoading(true);
    const result = await signup(values.name, values.email, values.phone, values.password);
    setIsLoading(false);

    if (result.success) {
      Alert.alert('Sucesso!', 'Conta criada com sucesso!');
    } else {
      let errorMessage = 'Erro desconhecido';
      
      if (result.error.includes('email-already-in-use')) {
        errorMessage = 'Este e-mail já está sendo usado por outra conta.';
      } else if (result.error.includes('invalid-email')) {
        errorMessage = 'E-mail inválido.';
      } else if (result.error.includes('weak-password')) {
        errorMessage = 'A senha é muito fraca.';
      } else {
        errorMessage = result.error;
      }
      
      Alert.alert('Erro no Cadastro', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      style={stylesCadastro.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={stylesCadastro.title}>Criar Conta</Text>

      <View style={stylesCadastro.formContainer}>
        <Input
          placeholder="Nome Completo"
          value={values.name}
          onChangeText={(text) => handleChange('name', text)}
          onBlur={() => handleBlur('name')}
          autoCapitalize="words"
          error={errors.name}
        />

        <Input
          placeholder="E-mail"
          value={values.email}
          onChangeText={(text) => handleChange('email', text)}
          onBlur={() => handleBlur('email')}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <Input
          placeholder="Telefone (com DDD)"
          value={values.phone}
          onChangeText={(text) => handleChange('phone', text)}
          onBlur={() => handleBlur('phone')}
          keyboardType="phone-pad"
          error={errors.phone}
        />

        <Input
          placeholder="Senha"
          value={values.password}
          onChangeText={(text) => handleChange('password', text)}
          onBlur={() => handleBlur('password')}
          secureTextEntry
          error={errors.password}
        />

        <Input
          placeholder="Confirmar Senha"
          value={values.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          onBlur={() => handleBlur('confirmPassword')}
          secureTextEntry
          error={errors.confirmPassword}
        />

        <View style={stylesCadastro.buttonContainer}>
          <Button
            title="Cadastrar"
            onPress={handleSignUp}
            disabled={isLoading}
            style={stylesCadastro.signupButton}
          />
          
          <Button
            title="Já tenho conta"
            onPress={() => onNavigate('LoginScreen')}
            variant="secondary"
            disabled={isLoading}
            style={stylesCadastro.loginButton}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};


export default CadastroScreen;
