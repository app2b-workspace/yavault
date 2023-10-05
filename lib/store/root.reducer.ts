import {combineReducers} from '@reduxjs/toolkit';
import {notesSlice} from '../notes/slices/notes.slice';
import {notesFailureSlice} from '../notes/slices/notes-failure.slice';
import {foldersSlice} from '../notes/slices/folder.slice';
import {authReducer} from '../auth/reducers/auth.reducer';

export const rootReducer = combineReducers({
  notes: notesSlice.reducer,
  notesFailure: notesFailureSlice.reducer,
  folders: foldersSlice.reducer,
  auth: authReducer,
});
