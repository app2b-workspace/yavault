import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {NoteItem} from './note-item.component';
import {NoteViewModel} from './note.viewmodel';
interface Props {
  folderName: string;
  isLoading: boolean;
  refresh: () => Promise<unknown>;
  notes: NoteViewModel[];
}
export const NoteList = ({isLoading, refresh, notes}: Props) => {
  const renderItem = ({item}: {item: NoteViewModel}) => (
    <NoteItem
      content={item.content}
      hasCompleted={item.hasCompleted()}
      complete={item.complete}
      time={item.time}
    />
  );
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refresh} />
      }
      data={notes}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
    />
  );
};
