import {createThunk} from '../../store/create-thunk';
import {selectAuthenticatedUserId} from '../../auth/reducers/auth.reducer';
import {createAction} from '@reduxjs/toolkit';

type CompleteNotePayload = {
  noteId: string;
  folderId: string;
};

interface CompleteNotePendingPayload {
  id: string;
  at: string;
}

export const completeNotePending = createAction<CompleteNotePendingPayload>(
  'notes/completeNotePending',
);
export const completeNote = createThunk(
  'usecase/notes/complete',
  async (
    {noteId, folderId}: CompleteNotePayload,
    {extra: {noteGateway, dateProvider}, getState, dispatch},
  ) => {
    const authorId = selectAuthenticatedUserId(getState());
    const now = dateProvider.now().toISOString();
    dispatch(completeNotePending({id: noteId, at: now}));
    return noteGateway.complete({authorId, noteId, folderId});
  },
);
