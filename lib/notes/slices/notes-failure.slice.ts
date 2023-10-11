import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {submitNote} from '../usecases/submit-a-note.usecase';
import {completeNote} from '../usecases/complete-a-note.usecase';

type NotesFailureState = {[noteId: string]: string};
export const notesFailureSlice = createSlice({
  name: 'notesFailure',
  initialState: {} as NotesFailureState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(submitNote.rejected, completeNote.rejected),
      (state, action) => {
        state[action.meta.arg.noteId] = action.error.message as string;
      },
    );
  },
});
