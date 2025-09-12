import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeDisplay = ({ 
  value, 
  size = 200, 
  title = "QR Code",
  instruction = "Mostre este QR Code para acumular pontos!",
  showPlaceholder = false 
}) => {
  if (!value || showPlaceholder) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.qrCodeContainer}>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              QR Code Temporariamente Indisponível
            </Text>
          </View>
        </View>
        <Text style={styles.instruction}>{instruction}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.qrCard}>
        <View style={styles.qrInnerFrame}>
          <QRCode
            value={value}
            size={size}
            color="black"
            backgroundColor="white"
          />
        </View>
      </View>
      <Text style={styles.instruction}>{instruction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  qrCard: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  qrInnerFrame: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9e9e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  placeholderText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default QRCodeDisplay;



