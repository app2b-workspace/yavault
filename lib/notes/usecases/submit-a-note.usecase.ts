import {createAction} from '@reduxjs/toolkit';
import {createThunk} from '../../store/create-thunk';
import {selectAuthenticatedUserId} from '../../auth/reducers/auth.reducer';

type SubmitNotePayload = {
  noteId: string;
  content: string;
  folderId: string;
};
type WillSubmitNotePayload = {
  noteId: string;
  authorId: string;
  content: string;
  folderId: string;
  time: string;
};

export const willSubmitNote = createAction<WillSubmitNotePayload>(
  'notes/submitNoteDirty',
);
export const submitNote = createThunk(
  'usecase/notes/submit',
  async (
    payload: SubmitNotePayload,
    {extra: {dateProvider, noteGateway}, dispatch, getState},
  ) => {
    const authorId = selectAuthenticatedUserId(getState());
    const willSubmitNotePayload: WillSubmitNotePayload = {
      noteId: payload.noteId,
      content: payload.content,
      time: dateProvider.now().toISOString(),
      folderId: payload.folderId,
      authorId,
    };
    dispatch(willSubmitNote(willSubmitNotePayload));
    return noteGateway.submit(willSubmitNotePayload);
  },
);
