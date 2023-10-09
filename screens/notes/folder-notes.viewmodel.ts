import {selectFolderNotesByTimeDesc} from '../../lib/notes/slices/folder.slice';
import {RootState} from '../../lib/store/create.store';

export interface NoteViewModel {
  id: string;
  content: string;
  time: string;
  authorId: string;
}

interface FolderNotesViewModel {
  notes: NoteViewModel[];
}

export const createFolderNotesViewModel = ({
  currentFolderId,
}: {
  currentFolderId: string;
}) => {
  return (state: RootState): FolderNotesViewModel => {
    return {
      notes: selectFolderNotesByTimeDesc(state, currentFolderId),
    };
  };
};
