import {refreshFolder} from '../../lib/notes/usecases/refresh-folder.usecase';
import {AppDispatch, RootState} from '../../lib/store/create.store';

export interface NoteViewModel {
  id: string;
  content: string;
  time: string;
  authorId: string;
}

interface RefreshFolderViewModel {
  refresh: () => Promise<unknown>;
}

export const createRefreshFolderViewModel = ({
  currentFolderId,
  dispatch,
}: {
  currentFolderId: string;
  dispatch: AppDispatch;
}) => {
  return (_: RootState): RefreshFolderViewModel => {
    return {
      refresh: () => {
        return dispatch(refreshFolder({folderId: currentFolderId}));
      },
    };
  };
};
