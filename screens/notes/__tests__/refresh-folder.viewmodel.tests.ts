import {createTestStore} from '../../../lib/store/create-test.store';
import {StateBuilder} from '../../../lib/store/state.builder';
import {createRefreshFolderViewModel} from '../refresh-folder.viewmodel';
import {InMemoryFolderGatewayAdapter} from '../../../lib/notes/adapters/inmemory-folder-gateway.adapter';
import {FakeFolderGatewayAdapter} from '../../../lib/notes/adapters/fake-folder-gateway.adapter';
import {refreshFolder} from '../../../lib/notes/usecases/refresh-folder.usecase';

let stateBuilder: StateBuilder;
let folderGateway: FakeFolderGatewayAdapter;
beforeEach(() => {
  stateBuilder = new StateBuilder();
  folderGateway = new InMemoryFolderGatewayAdapter();
});

describe('refresh my notes view model', () => {
  test('Example: refresh from my inbox folder', async () => {
    const store = createTestStore(stateBuilder.build(), {folderGateway});
    const refreshFolderViewModel = createRefreshFolderViewModel({
      currentFolderId: 'inbox-id',
      dispatch: store.dispatch,
    })(stateBuilder.build());
    await refreshFolderViewModel.refresh();
    expect(store.getLastDispatchedUseCaseArgs(refreshFolder)).toEqual({
      folderId: 'inbox-id',
    });
  });
});
