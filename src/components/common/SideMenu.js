import React, { useEffect, useRef } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SideMenu = ({ 
  visible, 
  onClose, 
  menuItems = [],
  title = "Menu",
  anchor = 'right'
}) => {
  const slideAnim = useRef(new Animated.Value(anchor === 'right' ? 260 : -260)).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(anchor === 'right' ? 260 : -260);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, anchor, slideAnim]);

  const handleClose = () => {
    const offset = anchor === 'right' ? 260 : -260;
    Animated.timing(slideAnim, {
      toValue: offset,
      duration: 250,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && onClose) onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        style={[styles.modalOverlay, { alignItems: anchor === 'right' ? 'flex-end' : 'flex-start' }]}
        activeOpacity={1}
        onPress={handleClose}
      >
        <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
          
          <View style={styles.menuContent}>
            {/* Header e linha do menu */}
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>{title}</Text>
            </View>
            <View style={styles.headerLine} />

            {/* Itens do menu */}
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={() => {
                  item.onPress();
                  handleClose();
                }}
              >
                <View style={styles.menuItemRow}>
                  {typeof item.icon === 'string' ? (
                    <Feather name={item.icon} size={18} color="#6b5f57" style={styles.menuItemIconFeather} />
                  ) : (
                    item.icon
                  )}
                  <Text style={styles.menuItemLabel}>{item.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>

        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  sideMenu: {
    width: 260,
    height: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 25, 
  },
  menuContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuHeader: {
    paddingBottom: 10,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Texto escuro
    textAlign: 'left',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderRadius: 12,
  },
  menuItemPressed: {
    backgroundColor: '#f2efed',
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIconFeather: {
    marginRight: 10,
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  headerLine: {
    height: 2,
    backgroundColor: '#eb8b47',
    width: '100%',
  },
});

export default SideMenu;
