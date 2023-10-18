import {
  selectIsFolderLoading,
  selectNotesByFolder,
} from '../../lib/notes/slices/folder.slice';
import {refreshFolder} from '../../lib/notes/usecases/refresh-folder.usecase';
import {
  AppDispatch,
  Dependencies,
  RootState,
} from '../../lib/store/create.store';
import {useDispatch, useSelector} from 'react-redux';
import {completeNote} from '../../lib/notes/usecases/complete-a-note.usecase';
import {PublishingStatus} from '../../lib/notes/models/note.model';
import {readableDate} from '../../lib/common/date.utils';

export interface NoteViewModel {
  id: string;
  content: string;
  time: string;
  authorId: string;
  hasCompleted: () => boolean;
  complete(): Promise<unknown>;
}

export interface RefreshFolderViewModel {
  notes: NoteViewModel[];
  isLoading: boolean;
  refresh(): Promise<unknown>;
}
export const useRefreshFolderViewModel = (
  folderId: string,
  {dateProvider}: Pick<Dependencies, 'dateProvider'>,
): RefreshFolderViewModel => {
  const notes = useSelector((state: RootState) =>
    selectNotesByFolder(state, folderId),
  );
  const isLoading = useSelector((state: RootState) =>
    selectIsFolderLoading(state, folderId),
  );

  const dispatch = useDispatch<AppDispatch>();
  const now = dateProvider.now();

  return {
    notes: notes.map(note => ({
      id: note.id,
      content: note.content,
      authorId: note.authorId,
      time: readableDate(new Date(now), new Date(note.time)),
      complete: () => dispatch(completeNote({folderId, noteId: note.id})),
      hasCompleted: () => note.status === PublishingStatus.Completed,
    })),
    refresh: () => dispatch(refreshFolder({folderId})),
    isLoading,
  };
};
