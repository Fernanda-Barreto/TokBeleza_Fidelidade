import { StyleSheet } from 'react-native';

const stylesLojista = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    backButton: {
      paddingVertical: 8,
      paddingRight: 12,
    },
    backText: {
      fontSize: 16,
      color: '#333',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    content: {
      padding: 16,
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#eee',
      padding: 12,
      marginTop: 8,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 12,
      marginBottom: 8,
    },
    infoText: {
      color: '#666',
      marginBottom: 8,
    },
    helperText: {
      color: '#666',
      marginTop: 8,
      marginBottom: 6,
    },
    scannerBox: {
      height: 220,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: '#000',
      justifyContent: 'flex-end',
      marginBottom: 8,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullscreenScanner: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'flex-end',
    },
    modalScanner: {
      width: '92%',
      height: 360,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: '#000',
      justifyContent: 'flex-end',
    },
    cameraFill: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    primaryButton: {
      backgroundColor: '#eb8b47',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#000',
      fontWeight: '700',
      fontSize: 16,
    },
    redeemButton: {
      backgroundColor: '#f2efed',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    redeemButtonText: {
      color: '#000',
      fontWeight: '600',
      fontSize: 16,
    },
    outlineButton: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      paddingVertical: 8,
      margin: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    outlineButtonText: {
      color: '#333',
      fontWeight: '600',
    },
    input: {
      backgroundColor: '#f2efed',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 0,
    },
    toggleRow: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 4,
    },
    toggleButton: {
      flex: 1,
      backgroundColor: '#f2efed',
      borderWidth: 0,
      borderRadius: 10,
      paddingVertical: 10,
      alignItems: 'center',
    },
    toggleSelected: {
      backgroundColor: '#eb8b47',
      borderColor: 'transparent',
    },
    toggleText: {
      color: '#000',
      fontWeight: '600',
    },
    toggleTextSelected: {
      color: '#000',
    },
    fieldRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 10,
    },
    label: {
      width: 70,
      color: '#333',
      fontWeight: '600',
    },
    inputSmall: {
      flex: 1,
      backgroundColor: '#f2efed',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 0,
    },
    previewBox: {
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#eee',
      padding: 10,
      marginTop: 8,
    },
    previewText: {
      color: '#333',
    },
    raffleItem: {
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginBottom: 6,
    },
    raffleItemSelected: {
      backgroundColor: '#f2efed',
      borderColor: '#eb8b47',
    },
    raffleItemText: {
      color: '#000',
      fontWeight: '600',
    },
    raffleItemTextSelected: {
      color: '#000',
    },
    actionsColumn: {
      marginTop: 20,
      gap: 10,
    },
  });

  export default stylesLojista;