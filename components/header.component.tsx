import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
interface Props {
  title: string;
  onNewNote: () => void;
}
export const Header = ({title, onNewNote}: Props) => {
  return (
    <View style={styles.content}>
      <View />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={[styles.editIconContainer, styles.editIconShadow]}
        onPress={onNewNote}>
        <Icon name="pencil" size={20} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {fontSize: 16, fontWeight: 'bold', color: 'white'},
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderBottomColor: '#ECEBEB',
    backgroundColor: '#b56d3f',
    paddingTop: 32,
    paddingBottom: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  editIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#7E4C2C',
    borderColor: '#ECEBEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  editIconShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  editIcon: {
    color: 'white',
  },
});
