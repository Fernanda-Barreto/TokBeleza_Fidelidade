import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const InfoRowCard = ({ title, value, description, thumbnailSource }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.valueText}>{value}</Text>
        {!!description && <Text style={styles.descriptionText}>{description}</Text>}
      </View>
      {thumbnailSource && (
        <Image source={thumbnailSource} style={styles.thumbnail} resizeMode="cover" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  titleText: {
    color: '#6b5f57',
    fontSize: 13,
    marginBottom: 2,
  },
  valueText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 4,
  },
  descriptionText: {
    color: '#6b5f57',
    fontSize: 13,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#f0edea',
  },
});

export default InfoRowCard;


