import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
interface Props {
  label: string;
}
export const Button = ({label}: Props) => {
  return (
    <TouchableOpacity style={[styles.submitNoteContent, styles.submitShadow]}>
      <Text style={styles.submitNoteLabel}>{label}</Text>
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
