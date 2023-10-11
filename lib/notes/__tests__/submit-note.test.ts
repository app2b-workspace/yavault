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
describe('Feature : Submit a note', () => {
  test('Example: Bob submits a note to inbox to remember to buy ananas', async () => {
    authFixture.givenAuthenticatedUser({id: 'bob-id'});
    noteFixture.givenNowIs(new Date('2023-10-31T06:30:00.000Z'));
    noteFixture.givenExistingFolder(aFolder('inbox-id', 'INBOX').build());
    await noteFixture.whenSubmittingNote({
      noteId: 'note-id',
      content: 'buy ananas',
      folderId: 'inbox-id',
    });
    noteFixture.thenRootStateShouldBe(
      {id: 'bob-id'},
      {
        id: 'inbox-id',
        name: 'INBOX',
        notes: [
          {
            id: 'note-id',
            authorId: 'bob-id',
            content: 'buy ananas',
            time: '2023-10-31T06:30:00.000Z',
            status: PublishingStatus.Runnning,
          },
        ],
      },
    );
  });
  test('Example: Bob submits a note to inbox with failure', async () => {
    authFixture.givenAuthenticatedUser({id: 'bob-id'});
    noteFixture.givenNowIs(new Date('2023-10-31T06:30:00.000Z'));
    noteFixture.givenExistingFolder(aFolder('inbox-id', 'INBOX').build());
    noteFixture.givenNoteWillFail('Submit note fails');
    await noteFixture.whenSubmittingNote({
      noteId: 'note-id',
      content: 'buy ananas',
      folderId: 'inbox-id',
    });
    noteFixture.thenRootStateShouldBe(
      {id: 'bob-id'},
      {
        id: 'inbox-id',
        name: 'INBOX',
        notes: [
          {
            id: 'note-id',
            authorId: 'bob-id',
            content: 'buy ananas',
            time: '2023-10-31T06:30:00.000Z',
            status: PublishingStatus.Dirty,
          },
        ],
      },
      {noteId: 'note-id', error: 'Submit note fails'},
    );
  });
});
