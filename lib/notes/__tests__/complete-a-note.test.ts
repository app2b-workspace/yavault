import {AuthFixture} from '../../auth/__tests__/auth.fixture';
import {StateBuilder} from '../../store/state.builder';
import {aFolder} from '../models/folder.builder';
import {PublishingStatus} from '../models/note.model';
import {NoteFixture} from './note.fixture';

let stateBuilder: StateBuilder;
let authFixture: AuthFixture;
let noteFixture: NoteFixture;
beforeEach(() => {
  stateBuilder = new StateBuilder();
  noteFixture = new NoteFixture(stateBuilder);
  authFixture = new AuthFixture(stateBuilder);
});
describe('Feature : Complete a note', () => {
  test('Example: Bob complete a note', async () => {
    authFixture.givenAuthenticatedUser({id: 'bob-id'});
    noteFixture.givenNowIs(new Date('2023-12-31T08:30:00.000Z'));
    noteFixture.givenExistingFolder(aFolder('inbox-id', 'INBOX').build());
    noteFixture.givenExistingNotes({
      folderId: 'inbox-id',
      notes: [
        {
          authorId: 'bob-id',
          content: 'call the dentiste',
          id: 'note-id1',
          status: PublishingStatus.Runnning,
          time: '2023-10-31T05:30:00.000Z',
        },
      ],
    });
    await noteFixture.whenCompletingNote({
      noteId: 'note-id1',
      folderId: 'inbox-id',
    });
    noteFixture.thenRootStateShouldBe(
      {id: 'bob-id'},
      {
        id: 'inbox-id',
        name: 'INBOX',
        notes: [
          {
            authorId: 'bob-id',
            content: 'call the dentiste',
            id: 'note-id1',
            status: PublishingStatus.Completed,
            time: '2023-12-31T08:30:00.000Z',
          },
        ],
      },
    );
  });
});

test('Example: Bob complete a note but fails', async () => {
  authFixture.givenAuthenticatedUser({id: 'bob-id'});
  noteFixture.givenNowIs(new Date('2023-12-31T08:30:00.000Z'));
  noteFixture.givenExistingFolder(aFolder('inbox-id', 'INBOX').build());
  noteFixture.givenNoteWillFail('Complete note fails');
  noteFixture.givenExistingNotes({
    folderId: 'inbox-id',
    notes: [
      {
        authorId: 'bob-id',
        content: 'call the dentist',
        id: 'note-id1',
        status: PublishingStatus.Runnning,
        time: '2023-10-31T05:30:00.000Z',
      },
    ],
  });
  await noteFixture.whenCompletingNote({
    noteId: 'note-id1',
    folderId: 'inbox-id',
  });
  noteFixture.thenRootStateShouldBe(
    {id: 'bob-id'},
    {
      id: 'inbox-id',
      name: 'INBOX',
      notes: [
        {
          authorId: 'bob-id',
          content: 'call the dentist',
          id: 'note-id1',
          status: PublishingStatus.Dirty,
          time: '2023-12-31T08:30:00.000Z',
        },
      ],
    },
    {noteId: 'note-id1', error: 'Complete note fails'},
  );
});
