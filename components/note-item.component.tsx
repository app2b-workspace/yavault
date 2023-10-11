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
    <View style={styles.noteItem}>
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
          <Icon name="check-circle" size={20} color="#34c759" />
        ) : (
          <Icon name="circle-thin" size={20} color="#888888" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#f2f2f2'},
  noteContent: {},
  noteCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  content: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555555',
  },
  time: {
    fontSize: 12,
    color: '#888888',
  },
  noteItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completeButton: {
    padding: 10,
  },
  completeNoteButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
