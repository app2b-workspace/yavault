import {createSlice} from '@reduxjs/toolkit';
import {willSubmitNote} from '../usecases/submit-a-note.usecase';
import {foldersAdapter} from '../models/folder.model';
import {refreshFolder} from '../usecases/refresh-folder.usecase';

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
