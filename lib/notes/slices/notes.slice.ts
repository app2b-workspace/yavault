import {EntityState, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {Note, PublishingStatus, notesAdapter} from '../models/note.model';
import {willSubmitNote, submitNote} from '../usecases/submit-a-note.usecase';
import {refreshFolder} from '../usecases/refresh-folder.usecase';
import {
  completeNote,
  completeNotePending,
} from '../usecases/complete-a-note.usecase';

type NoteState = EntityState<Note>;

export const notesSlice = createSlice({
  name: 'notes',
  initialState: notesAdapter.getInitialState() as NoteState,
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
            status: PublishingStatus.Runnning,
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
          status: PublishingStatus.Runnning,
        }));
        notesAdapter.upsertMany(state, willRefreshNotes);
      })
      .addCase(completeNote.fulfilled, (state, action) => {
        notesAdapter.updateOne(state, {
          id: action.meta.arg.noteId,
          changes: {
            status: PublishingStatus.Completed,
          },
        });
      })
      .addCase(completeNotePending, (state, action) => {
        notesAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            time: action.payload.at,
          },
        });
      })
      .addMatcher(isAnyOf(completeNote.rejected), (state, action) => {
        notesAdapter.updateOne(state, {
          id: action.meta.arg.noteId,
          changes: {
            status: PublishingStatus.Dirty,
          },
        });
      });
  },
});
