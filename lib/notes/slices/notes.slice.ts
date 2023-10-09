import {createSlice} from '@reduxjs/toolkit';
import {Note, PublishingStatus, notesAdapter} from '../models/note.model';
import {willSubmitNote, submitNote} from '../usecases/submit-a-note.usecase';
import {refreshFolder} from '../usecases/refresh-folder.usecase';
import {RootState} from '../../store/create.store';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: notesAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(willSubmitNote, (state, action) => {
        return notesAdapter.setOne(state, {
          id: action.payload.noteId,
          authorId: action.payload.authorId,
          content: action.payload.content,
          status: PublishingStatus.Dirty,
          time: action.payload.time,
        });
      })
      .addCase(submitNote.fulfilled, (state, action) => {
        notesAdapter.updateOne(state, {
          id: action.meta.arg.noteId,
          changes: {
            status: PublishingStatus.Submitted,
          },
        });
      })
      .addCase(refreshFolder.fulfilled, (state, action) => {
        const response = action.payload;
        const willRefreshNotes: Note[] = response.notes.map(noteResponse => ({
          id: noteResponse.id,
          content: noteResponse.content,
          time: noteResponse.time,
          authorId: noteResponse.authorId,
          status: PublishingStatus.Submitted,
        }));
        notesAdapter.upsertMany(state, willRefreshNotes);
      });
  },
});
