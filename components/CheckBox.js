import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    height: 30,
    width: 30,
  },
});

const CheckBox = ({ checked, size, onPress }) => (
  <TouchableOpacity
    style={[styles.box, { borderColor: checked ? '#43d1bd' : 'white' }]}
    onPress={onPress}
    activeOpacity={1}
  >
    <Ionicons name="ios-checkmark" color={checked ? '#43d1bd' : 'white'} size={size || 27} />
  </TouchableOpacity>
);

export default CheckBox;