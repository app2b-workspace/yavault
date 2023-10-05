import {selectAuthenticatedUserId} from '../../auth/reducers/auth.reducer';
import {createThunk} from '../../store/create-thunk';

interface RefreshFolderPayload {
  folderId: string;
}
export const refreshFolder = createThunk(
  'folder/refreshFolder',
  async (
    {folderId}: RefreshFolderPayload,
    {extra: {folderGateway}, getState},
  ) => {
    const authenticatedUserId = selectAuthenticatedUserId(getState());
    return folderGateway.refresh({authenticatedUserId, folderId});
  },
);
