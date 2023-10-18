import {PublishingStatus} from '../../../lib/notes/models/note.model';
import {aState} from '../../../lib/store/state.builder';
import {
  NoteViewModel,
  RefreshFolderViewModel,
  useRefreshFolderViewModel,
} from '../refresh-folder.viewmodel';
import {createTestStore} from '../../../lib/store/create-test.store';
import {FakeFolderGatewayAdapter} from '../../../lib/notes/adapters/fake-folder-gateway.adapter';
import {act} from 'react-test-renderer';
import {aNote} from '../../../lib/notes/models/node.builder';
import {FakeDateProviderAdapter} from '../../../lib/notes/adapters/fake-date-provider.adapter';
import {
  renderViewModelHook,
  wrapperWithReduxStore,
} from '../../../components/__tests__/viewmodel.fixture';

const createNoteView = ({
  authorId,
  content,
  id,
  time,
}: {
  id: string;
  authorId: string;
  content: string;
  time: string;
}): Partial<NoteViewModel> => ({
  authorId,
  content,
  id,
  time,
});

let folderGateway: FakeFolderGatewayAdapter;
let dateProvider: FakeDateProviderAdapter;
beforeEach(() => {
  folderGateway = new FakeFolderGatewayAdapter();
  dateProvider = new FakeDateProviderAdapter();
});

describe('display my notes view model', () => {
  test('Example: refresh my empty notes from inbox folder', async () => {
    dateProvider.nowIs = new Date('2023-10-09T16:41:21.000Z');
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
      aState().withFolder({id: 'inbox-id', name: 'INBOW'}).build(),
      {folderGateway, dateProvider},
    );
    const wrapper = wrapperWithReduxStore(store);
    const {result} = renderViewModelHook(
      () => useRefreshFolderViewModel('inbox-id', {dateProvider}),
      wrapper,
    );
    await act(() => {
      result.current.refresh();
    });
    expect(result.current.notes).toMatchObject([
      createNoteView({
        content: 'appeller ma soeur',
        time: '17:41',
        id: 'note-idx',
        authorId: 'bob-id',
      }),
    ]);
  });

  test('Example: complete my note from inbox folder', async () => {
    dateProvider.nowIs = new Date('2023-11-11T16:41:21.000Z');
    const store = createTestStore(
      aState()
        .withFolder({id: 'inbox-id', name: 'INBOW'})
        .withNotes('inbox-id', [
          aNote('note-id1')
            .withAuthorId('bob-id')
            .withContent('appeler les impots')
            .withStatus(PublishingStatus.Runnning)
            .withTime(new Date('2023-10-09T15:41:21.000Z'))
            .build(),
        ])
        .build(),
      {folderGateway, dateProvider},
    );
    const wrapper = wrapperWithReduxStore(store);
    const {result} = renderViewModelHook(
      () => useRefreshFolderViewModel('inbox-id', {dateProvider}),
      wrapper,
    );
    await act(async () => {
      const noteVm = result.current.notes.find(nvm => nvm.id === 'note-id1');
      if (noteVm) {
        await noteVm.complete();
      }
    });
    expect(result.current.notes).toMatchObject([
      createNoteView({
        authorId: 'bob-id',
        content: 'appeler les impots',
        id: 'note-id1',
        time: '17:41',
      }),
    ]);
  });
});
