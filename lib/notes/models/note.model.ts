import {createEntityAdapter} from '@reduxjs/toolkit';

export enum PublishingStatus {
  Dirty,
  Runnning,
  Completed,
}
export interface Note {
  id: string;
  time: string;
  content: string;
  authorId: string;
  status: PublishingStatus;
}
export const notesAdapter = createEntityAdapter<Note>();
