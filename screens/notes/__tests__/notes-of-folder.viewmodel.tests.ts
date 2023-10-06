import {AsyncThunk, isAsyncThunkAction} from '@reduxjs/toolkit';
import {FakeDateProviderAdapter} from '../../../lib/notes/adapters/fake-date-provider.adapter';
import {FakeFolderGatewayAdapter} from '../../../lib/notes/adapters/fake-folder-gateway.adapter';
import {FakeNoteGatewayAdapter} from '../../../lib/notes/adapters/fake-note-gateway.adapter';
import {
  Dependencies,
  RootState,
  Store,
  createStore,
} from '../../../lib/store/create.store';

/*let stateBuilder: StateBuilder;
beforeEach(() => {
  stateBuilder = new StateBuilder();
});*/

describe('list of my notes view model', () => {
  test('Example: there is no notes in my inbox folder', async () => {
    /* const store = createTestStore(stateBuilder);
    const viewModel = createNotesOfFolderViewModel({
      currentFolderId: 'inbox-id',
      dispatch: store.dispatch,
    })(stateBuilder.build());
    await viewModel.refresh();
    expect(store.getLastDispatchedUseCaseArgs(submitNote)).toEqual({
      noteId: 'note-id',
    });*/
    return true;
  });
});
