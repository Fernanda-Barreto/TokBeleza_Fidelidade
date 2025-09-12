import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  style,
  textStyle 
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
    style
  ];

  const buttonTextStyle = [
    styles.buttonText,
    styles[`${variant}Text`],
    disabled && styles.disabledText,
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#eb8b47',
  },
  secondary: {
    backgroundColor: '#f2efed',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  danger: {
    backgroundColor: '#dc3545',
  },
  disabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  primaryText: {
    color: '#000',
  },
  secondaryText: {
    color: '#000',
  },
  dangerText: {
    color: 'white',
  },
  disabledText: {
    color: '#999',
  },
});

export default Button;



