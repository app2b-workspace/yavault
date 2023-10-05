import {createSlice} from '@reduxjs/toolkit';
import {submitNote} from '../usecases/submit-a-note.usecase';

type NotesFailureState = {[noteId: string]: string};
export const notesFailureSlice = createSlice({
  name: 'notesFailure',
  initialState: {} as NotesFailureState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(submitNote.rejected, (state, action) => {
      state[action.meta.arg.noteId] = action.error.message as string;
    });
  },
});
