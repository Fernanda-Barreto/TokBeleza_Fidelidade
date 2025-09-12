// src/screens/LoginScreen.js (Apenas o handleLogin e o import de onNavigate, o resto permanece igual)

import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { useAuth } from '../hooks/useAuth';
import stylesLogin from '../style/LoginScreenStyle';
import { useForm } from '../hooks/useForm';
import { validateEmail } from '../utils/validation';

import Button from '../components/common/Button';
import Input from '../components/common/Input';

const LoginScreen = ({ onNavigate }) => {
  const { login, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = {
    email: (value) => {
      if (!value.trim()) return 'E-mail é obrigatório';
      if (!validateEmail(value)) return 'E-mail inválido';
      return '';
    },
    password: (value) => {
      if (!value.trim()) return 'Senha é obrigatória';
      return '';
    }
  };

  const { values, errors, handleChange, handleBlur, validateForm } = useForm(
    { email: '', password: '' },
    validationSchema
  );

  const handleLogin = async () => {
    const { isValid } = validateForm();
    
    if (!isValid) {
      Alert.alert('Erro no Login', 'Por favor, corrija os erros no formulário.');
      return;
    }

    setIsLoading(true);
    const result = await login(values.email.trim(), values.password);
    setIsLoading(false);

    if (result.success) {
      Alert.alert('Sucesso!', 'Login efetuado com sucesso!');
    } else {
      let errorMessage = 'Erro desconhecido';
      
      if (result.error.includes('user-not-found')) {
        errorMessage = 'Usuário não encontrado. Verifique seu e-mail.';
      } else if (result.error.includes('wrong-password')) {
        errorMessage = 'Senha incorreta.';
      } else if (result.error.includes('invalid-email')) {
        errorMessage = 'E-mail inválido.';
      } else if (result.error.includes('too-many-requests')) {
        errorMessage = 'Muitas tentativas de login. Tente novamente mais tarde.';
      } else {
        errorMessage = result.error;
      }
      
      Alert.alert('Erro no Login', errorMessage);
    }
  };

  const handleForgotPassword = async () => {
    if (!values.email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail primeiro para recuperar a senha.');
      return;
    }

    setIsLoading(true);
    const result = await resetPassword(values.email.trim());
    setIsLoading(false);

    if (result.success) {
      Alert.alert(
        'E-mail Enviado!', 
        'Um link para redefinir sua senha foi enviado para seu e-mail. Verifique sua caixa de entrada.'
      );
    } else {
      let errorMessage = 'Erro ao enviar e-mail de recuperação.';
      
      if (result.error.includes('user-not-found')) {
        errorMessage = 'E-mail não encontrado. Verifique se o e-mail está correto.';
      } else if (result.error.includes('invalid-email')) {
        errorMessage = 'E-mail inválido.';
      } else if (result.error.includes('too-many-requests')) {
        errorMessage = 'Muitas tentativas. Tente novamente mais tarde.';
      }
      
      Alert.alert('Erro', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      style={stylesLogin.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={stylesLogin.title}>Fidelidade Digital</Text>

      <View style={stylesLogin.formContainer}>
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
          placeholder="Senha"
          value={values.password}
          onChangeText={(text) => handleChange('password', text)}
          onBlur={() => handleBlur('password')}
          secureTextEntry
          error={errors.password}
        />

        <TouchableOpacity 
          onPress={handleForgotPassword}
          style={stylesLogin.forgotPasswordButton}
          disabled={isLoading}
        >
          <Text style={stylesLogin.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <View style={stylesLogin.buttonContainer}>
          <Button
            title="Entrar"
            onPress={handleLogin}
            disabled={isLoading}
            style={stylesLogin.loginButton}
          />
          
          <Button
            title="Cadastrar"
            onPress={() => onNavigate('CadastroScreen')}
            variant="secondary"
            disabled={isLoading}
            style={stylesLogin.signupButton}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};


export default LoginScreen;