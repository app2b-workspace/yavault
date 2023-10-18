import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
interface Props {
  hasCompleted: boolean;
  content: string;
  time: string;
  complete: () => Promise<unknown>;
}
export const NoteItem = ({hasCompleted, content, time, complete}: Props) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.noteContent}>
        <Text
          style={[
            styles.content,
            hasCompleted ? styles.noteCompleted : undefined,
          ]}>
          {content}
        </Text>
        <Text
          style={[
            styles.time,
            hasCompleted ? styles.noteCompleted : undefined,
          ]}>
          {time}
        </Text>
      </View>
      <TouchableOpacity
        onPress={complete}
        disabled={hasCompleted}
        style={styles.completeButton}>
        {hasCompleted ? (
          <Icon name="check-circle" size={20} color={'#b56d3f'} />
        ) : (
          <Icon name="circle-thin" size={20} color={'#b56d3f'} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginVertical: 8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  noteContent: {},
  noteCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  content: {
    fontSize: 14,
    marginBottom: 4,
    color: 'black',
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: 'black',
  },

  completeButton: {},
  completeNoteButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
