import {EntityState, createSelector, createSlice} from '@reduxjs/toolkit';
import {willSubmitNote} from '../usecases/submit-a-note.usecase';
import {Folder, foldersAdapter} from '../models/folder.model';
import {refreshFolder} from '../usecases/refresh-folder.usecase';
import {Note, notesAdapter} from '../models/note.model';
import {RootState} from '../../store/create.store';
import {isDefinedOrNotNullGuard} from '../../common/is-defined-or-not-null.guard';

type FolderState = EntityState<Folder> & {
  loading: {[folderId: string]: boolean};
};

export const foldersSlice = createSlice({
  name: 'folders',
  initialState: foldersAdapter.getInitialState({loading: {}}) as FolderState,
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
      .addCase(refreshFolder.rejected, (state, action) => {
        state.loading[action.meta.arg.folderId] = false;
      })
      .addCase(refreshFolder.pending, (state, action) => {
        state.loading[action.meta.arg.folderId] = true;
      })
      .addCase(refreshFolder.fulfilled, (state, action) => {
        state.loading[action.payload.folderId] = false;
        const folder = foldersAdapter
          .getSelectors()
          .selectById(state, action.payload.folderId);
        if (!folder) {
          return;
        }
        foldersAdapter.updateOne(state, {
          id: action.payload.folderId,
          changes: {
            notes: [
              ...new Set([
                ...folder.notes,
                ...action.payload.notes.map(n => n.id),
              ]),
            ],
          },
        });
      });
  },
});
const EMPTY_NOTE_ARRAY: Note[] = [];

export const selectNotesByFolderByTimeDesc = createSelector(
  [
    (state: RootState) => state,
    (state: RootState, folderId: string) => {
      const folder = foldersAdapter
        .getSelectors()
        .selectById(state.folders, folderId);
      return folder;
    },
  ],
  (state: RootState, folder: Folder | undefined) => {
    if (!folder) {
      return EMPTY_NOTE_ARRAY;
    }
    return folder.notes
      .map(noteId => {
        const note = notesAdapter
          .getSelectors()
          .selectById(state.notes, noteId);
        return note;
      })
      .filter(isDefinedOrNotNullGuard)
      .sort(
        (left, right) =>
          new Date(right.time).getTime() - new Date(left.time).getTime(),
      );
  },
);

export const selectIsFolderLoading = (
  state: RootState,
  folderId: string,
): boolean => {
  return state.folders.loading[folderId];
};
