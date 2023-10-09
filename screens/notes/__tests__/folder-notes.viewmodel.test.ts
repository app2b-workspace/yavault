import {aNote} from '../../../lib/notes/models/node.builder';
import {PublishingStatus} from '../../../lib/notes/models/note.model';
import {StateBuilder} from '../../../lib/store/state.builder';
import {createFolderNotesViewModel} from '../folder-notes.viewmodel';

let stateBuilder: StateBuilder;
beforeEach(() => {
  stateBuilder = new StateBuilder();
});

describe('refresh my notes view model', () => {
  test('Example: display notes from my inbox folder ordered desc by time', async () => {
    const inboxNotesViewModel = createFolderNotesViewModel({
      currentFolderId: 'inbox-id',
    })(
      stateBuilder
        .withFolder({id: 'inbox-id', name: 'INBOX'})
        .withNotes('inbox-id', [
          aNote('note-id1')
            .withAuthorId('bob-id')
            .withContent('appeller ma soeur')
            .withTime(new Date('2023-10-09T15:41:21.000Z'))
            .withStatus(PublishingStatus.Submitted)
            .build(),
          aNote('note-id2')
            .withAuthorId('bob-id')
            .withContent('acheter cadeaux de noel')
            .withTime(new Date('2023-11-09T15:41:21.000Z'))
            .withStatus(PublishingStatus.Submitted)
            .build(),
        ])
        .withFolder({id: 'blairwith-project-id', name: 'Blairwitch project'})
        .withNotes('blairwith-project-id', [
          aNote('note-id3')
            .withAuthorId('bob-id')
            .withContent('acheter une tente de survie')
            .withTime(new Date('2023-09-09T15:41:21.000Z'))
            .withStatus(PublishingStatus.Submitted)
            .build(),
        ])
        .build(),
    );
    expect(inboxNotesViewModel.notes).toEqual([
      {
        id: 'note-id2',
        content: 'acheter cadeaux de noel',
        time: '2023-11-09T15:41:21.000Z',
        status: PublishingStatus.Submitted,
        authorId: 'bob-id',
      },
      {
        id: 'note-id1',
        content: 'appeller ma soeur',
        time: '2023-10-09T15:41:21.000Z',
        status: PublishingStatus.Submitted,
        authorId: 'bob-id',
      },
    ]);
  });
});
