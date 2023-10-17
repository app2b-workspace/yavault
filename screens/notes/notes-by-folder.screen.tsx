import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useNotesByFolderViewModel} from './notes-by-folder.viewmodel';
import {StyleSheet, View} from 'react-native';
import {NoteList} from '../../components/note-list.component';
import {Header} from '../../components/header.component';

import {
  SubmitNoteForm,
  SubmitNoteFormMethods,
} from '../../components/submit-note-form.component';
import {DependenciesContext} from '../../context/dependencies.context';
interface Props {
  currentFolderId: string;
}

export const NotesByFolderScreen = ({currentFolderId}: Props) => {
  const submitFormRef = useRef<SubmitNoteFormMethods>(null);

  const dependencies = useContext(DependenciesContext);
  const viewModel = useNotesByFolderViewModel(currentFolderId, dependencies);
  useEffect(() => {
    viewModel.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddNoteFormCallback = useCallback(() => {
    submitFormRef.current?.expand();
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
        ref={submitFormRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
});
