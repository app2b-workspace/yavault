import {createEntityAdapter} from '@reduxjs/toolkit';

export interface Folder {
  id: string;
  name: string;
  notes: string[];
}
export const foldersAdapter = createEntityAdapter<Folder>();
