import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const Header = ({title}: {title: string}) => {
  return <Text style={styles.header}>{title}</Text>;
};

const styles = StyleSheet.create({
  header: {fontSize: 24, fontWeight: 'bold', margin: 16},
});
