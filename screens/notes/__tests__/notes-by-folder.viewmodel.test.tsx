import React from 'react';
import {PublishingStatus} from '../../../lib/notes/models/note.model';
import {aState} from '../../../lib/store/state.builder';
import {useNotesByFolderViewModel} from '../notes-by-folder.viewmodel';
import {renderHook} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createTestStore} from '../../../lib/store/create-test.store';
import {Store} from '../../../lib/store/create.store';
import {FakeFolderGatewayAdapter} from '../../../lib/notes/adapters/fake-folder-gateway.adapter';
import {act} from 'react-test-renderer';

const wrapperWithStore =
  (store: Store) =>
  ({children}: {children: React.ReactNode}) =>
    <Provider store={store}>{children}</Provider>;

const renderViewModelHook = (folderId: string, wrapper: any) => {
  return renderHook(() => useNotesByFolderViewModel(folderId), {wrapper});
};

let folderGateway: FakeFolderGatewayAdapter;
beforeEach(() => {
  folderGateway = new FakeFolderGatewayAdapter();
});

describe('display my notes view model', () => {
  test('Example: refresh my empty notes from inbox folder', async () => {
    folderGateway.responses = {
      folderId: 'inbox-id',
      notes: [
        {
          authorId: 'bob-id',
          content: 'appeller ma soeur',
          time: '2023-10-09T15:41:21.000Z',
          id: 'note-idx',
        },
      ],
    };
    const store = createTestStore(
      aState()
        .withFolder({id: 'inbox-id', name: 'INBOW', isLoading: false})
        .build(),
      {folderGateway},
    );
    const wrapper = wrapperWithStore(store);
    const {result} = renderViewModelHook('inbox-id', wrapper);
    await act(() => {
      result.current.refresh();
    });
    expect(result.current.notes).toEqual([
      {
        content: 'appeller ma soeur',
        time: '2023-10-09T15:41:21.000Z',
        id: 'note-idx',
        status: PublishingStatus.Submitted,
        authorId: 'bob-id',
      },
    ]);
  });
});
