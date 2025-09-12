import { StyleSheet } from 'react-native';
const stylesLogin = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      width: '100%',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 40,
      color: '#333',
    },
    formContainer: {
      width: '80%',
    },
    forgotPasswordButton: {
      marginBottom: 20,
      paddingVertical: 10,
      alignItems: 'flex-start',
    },
    forgotPasswordText: {
      color: '#6b5f57',
      fontSize: 14,
      textDecorationLine: 'underline',
      fontWeight: '500',
    },
    buttonContainer: {
      width: '100%',
      gap: 1,
    },
    loginButton: {
      marginBottom: 10,
    },
    signupButton: {
      marginTop: 10,
    },
  });

  export default stylesLogin;