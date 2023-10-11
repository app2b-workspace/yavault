import React, {useEffect} from 'react';
import {
  NoteViewModel,
  useNotesByFolderViewModel,
} from './notes-by-folder.viewmodel';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Header} from '../../components/header.component';
import {NoteItem} from '../../components/note-item.component';

interface Props {
  currentFolderId: string;
}
export const NotesByFolderScreen = ({currentFolderId}: Props) => {
  const viewModel = useNotesByFolderViewModel(currentFolderId);
  const renderItem = ({item}: {item: NoteViewModel}) => (
    <NoteItem
      content={item.content}
      hasCompleted={item.hasCompleted()}
      complete={item.complete}
      time={item.time}
    />
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
});
