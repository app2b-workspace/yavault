import React, {useEffect} from 'react';
import {
  NoteViewModel,
  useNotesByFolderViewModel,
} from './notes-by-folder.viewmodel';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../../components/header.component';

interface Props {
  currentFolderId: string;
}
export const NotesByFolderScreen = ({currentFolderId}: Props) => {
  const viewModel = useNotesByFolderViewModel(currentFolderId);
  const renderItem = ({item}: {item: NoteViewModel}) => (
    <TouchableOpacity style={styles.noteItem}>
      <View>
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    viewModel.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <Header title={'INBOX'} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={viewModel.isLoading}
            onRefresh={viewModel.refresh}
          />
        }
        data={viewModel.notes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#f2f2f2'},
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
  },
});
