import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
interface Props {
  label: string;
  disabled: boolean;
  onPress: () => void;
}
export const Button = ({disabled, label, onPress}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.submitNoteContent, styles.submitShadow]}
      onPress={onPress}>
      <Text
        style={[styles.submitNoteLabel, !disabled ? styles.bold : undefined]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitNoteContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#b56d3f',
    padding: 8,
    marginVertical: 8,
  },
  submitNoteLabel: {
    color: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
  submitShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
