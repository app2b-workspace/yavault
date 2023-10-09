import {
  selectIsFolderLoading,
  selectNotesByFolderByTimeDesc,
} from '../../lib/notes/slices/folder.slice';
import {refreshFolder} from '../../lib/notes/usecases/refresh-folder.usecase';
import {AppDispatch, RootState} from '../../lib/store/create.store';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';

export type NoteViewModel = {
  id: string;
  content: string;
  time: string;
  authorId: string;
};

type NotesByFolderViewModel = {
  notes: NoteViewModel[];
  isLoading: boolean;
  refresh(): Promise<unknown>;
};

export const useNotesByFolderViewModel = (
  folderId: string,
): NotesByFolderViewModel => {
  const notes = useSelector((state: RootState) =>
    selectNotesByFolderByTimeDesc(state, folderId),
  );
  const isLoading = useSelector((state: RootState) =>
    selectIsFolderLoading(state, folderId),
  );

  const dispatch = useDispatch<AppDispatch>();

  const refresh = useCallback(
    () => dispatch(refreshFolder({folderId})),
    [dispatch, folderId],
  );
  return {
    notes,
    refresh,
    isLoading,
  };
};
