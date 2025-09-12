import { StyleSheet } from 'react-native';

const stylesCadastro = StyleSheet.create({
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
    buttonContainer: {
      width: '100%',
      gap: 1,
      marginTop: 20,
    },
    signupButton: {
      marginBottom: 10,
    },
    loginButton: {
      marginTop: 10,
    },
  });

  export default stylesCadastro;