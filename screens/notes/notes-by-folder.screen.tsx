import React, {useCallback, useEffect, useState} from 'react';
import {useNotesByFolderViewModel} from './notes-by-folder.viewmodel';
import {StyleSheet, View} from 'react-native';
import {NoteList} from '../../components/note-list.component';
import {Header} from '../../components/header.component';

import {SubmitNoteForm} from '../../components/submit-note-form.component';
interface Props {
  currentFolderId: string;
}

export const NotesByFolderScreen = ({currentFolderId}: Props) => {
  const [isSubmitNoteFormVisible, setSubmitNoteFormVisible] = useState(false);

  const viewModel = useNotesByFolderViewModel(currentFolderId);
  useEffect(() => {
    viewModel.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddNoteFormCallback = useCallback(() => {
    setSubmitNoteFormVisible(true);
  }, []);
  const closeAddNoteFormCallback = useCallback(() => {
    setSubmitNoteFormVisible(false);
  }, []);
  return (
    <View style={styles.container}>
      <Header title={'INBOX'} onNewNote={openAddNoteFormCallback} />
      <NoteList
        folderName="INBOX"
        isLoading={viewModel.isLoading}
        notes={viewModel.notes}
        refresh={viewModel.refresh}
      />
      <SubmitNoteForm
        noteContentPlaceholder="Que souhaitez-vous accomplir ?"
        noteSubmitLabel="SUBMIT"
        visible={isSubmitNoteFormVisible}
        onClose={closeAddNoteFormCallback}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
});
