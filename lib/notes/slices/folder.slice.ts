import {createSlice} from '@reduxjs/toolkit';
import {willSubmitNote} from '../usecases/submit-a-note.usecase';
import {foldersAdapter} from '../models/folder.model';
import {refreshFolder} from '../usecases/refresh-folder.usecase';
import {Note, notesAdapter} from '../models/note.model';
import {RootState} from '../../store/create.store';
import {isDefinedOrNotNullGuard} from '../../common/is-defined-or-not-null.guard';

export const foldersSlice = createSlice({
  name: 'folders',
  initialState: foldersAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(willSubmitNote, (state, action) => {
        const folder = foldersAdapter
          .getSelectors()
          .selectById(state, action.payload.folderId);
        if (!folder) {
          return;
        }
        foldersAdapter.updateOne(state, {
          id: action.payload.folderId,
          changes: {
            notes: [...folder.notes, action.payload.noteId],
          },
        });
      })
      .addCase(refreshFolder.fulfilled, (state, action) => {
        const folder = foldersAdapter
          .getSelectors()
          .selectById(state, action.payload.folderId);
        if (!folder) {
          return;
        }
        foldersAdapter.updateOne(state, {
          id: action.payload.folderId,
          changes: {
            notes: [...folder.notes, ...action.payload.notes.map(n => n.id)],
          },
        });
      });
  },
});

export const selectFolderNotesByTimeDesc = (
  state: RootState,
  folderId: string,
): Note[] => {
  const folder = foldersAdapter
    .getSelectors()
    .selectById(state.folders, folderId);
  if (!folder) {
    return [];
  }
  return folder.notes
    .map(noteId => {
      const note = notesAdapter.getSelectors().selectById(state.notes, noteId);
      return note;
    })
    .filter(isDefinedOrNotNullGuard)
    .sort(
      (left, right) =>
        new Date(right.time).getTime() - new Date(left.time).getTime(),
    );
};
