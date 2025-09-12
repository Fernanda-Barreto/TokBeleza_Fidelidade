import { StyleSheet } from 'react-native';

const stylesHome = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#f5f5f5', // Fundo neutro
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    loadingText: {
      fontSize: 20,
      color: '#666',
    },
    scrollContainer: {
      flex: 1,
      backgroundColor: '#f5f5f5', // Fundo neutro
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5', // Fundo neutro
      width: '100%',
    },
    headerContainer: {
      width: '100%',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatarContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#eb8b47',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    avatarText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    userTextContainer: {
      flex: 1,
    },
    userNameText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 2,
    },
    userEmailText: {
      fontSize: 14,
      color: '#666',
    },
    menuButton: {
      padding: 10,
    },
    menuIcon: {
      width: 24,
      height: 18,
      justifyContent: 'space-between',
    },
    menuLine: {
      width: '100%',
      height: 3,
      backgroundColor: '#eb8b47',
      borderRadius: 2,
    },
    headerLine: {
      height: 2,
      backgroundColor: '#eb8b47',
      width: '100%',
    },
    boxscheck: {
      width: '100%',
      paddingTop: 20,
    },
    fidelityBox: {
      backgroundColor: '#f7f6f5',
      marginHorizontal: 20,
      marginVertical: 12,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#eee',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 2,
    },
    raffleBox: {
      backgroundColor: '#f7f6f5',
      marginHorizontal: 20,
      marginVertical: 12,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#eee',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 2,
    },
    boxTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#6b5f57',
      marginBottom: 8,
    },
    pointsText: {
      fontSize: 22,
      fontWeight: '700',
      color: '#000',
      marginBottom: 6,
    },
    nextRewardText: {
      fontSize: 13,
      color: '#6b5f57',
    },
    rewardReadyText: {
      fontSize: 14,
      fontWeight: '700',
      color: '#2f8f46',
    },
    raffleText: {
      fontSize: 14,
      fontWeight: '700',
      color: '#000',
      marginBottom: 6,
    },
    raffleInstruction: {
      fontSize: 13,
      color: '#6b5f57',
    },
});

export default stylesHome;