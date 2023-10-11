import {AuthFixture} from '../../auth/__tests__/auth.fixture';
import {StateBuilder} from '../../store/state.builder';
import {aFolder} from '../models/folder.builder';
import {aNote} from '../models/node.builder';
import {PublishingStatus} from '../models/note.model';
import {NoteFixture} from './note.fixture';

let stateBuilder: StateBuilder;
let noteFixture: NoteFixture;
let authFixture: AuthFixture;
beforeEach(() => {
  stateBuilder = new StateBuilder();
  noteFixture = new NoteFixture(stateBuilder);
  authFixture = new AuthFixture(stateBuilder);
});

describe('Feature : Refreshing notes', () => {
  test('Example: There is no note and Bob pulls new notes', async () => {
    authFixture.givenAuthenticatedUser({id: 'bob-id'});
    noteFixture.givenExistingFolder(aFolder('inbox-id', 'INBOX').build());
    noteFixture.givenRemoteNotes('inbox-id', [
      {
        id: 'note-id1',
        authorId: 'bob-id',
        content: 'buy ananas',
        time: new Date('2023-10-31T06:30:00.000Z'),
      },
      {
        id: 'note-id2',
        authorId: 'bob-id',
        content: 'buy strawberry',
        time: new Date('2023-11-20T05:30:00.000Z'),
      },
    ]);
    await noteFixture.whenRefreshingFolder('inbox-id');
    noteFixture.thenRootStateShouldBe(
      {id: 'bob-id'},
      {
        id: 'inbox-id',
        name: 'INBOX',
        notes: [
          {
            id: 'note-id1',
            authorId: 'bob-id',
            content: 'buy ananas',
            time: '2023-10-31T06:30:00.000Z',
            status: PublishingStatus.Runnning,
          },
          {
            id: 'note-id2',
            authorId: 'bob-id',
            content: 'buy strawberry',
            time: '2023-11-20T05:30:00.000Z',
            status: PublishingStatus.Runnning,
          },
        ],
      },
    );
  });

  test('Example: There is one stored note and Bob pull new notes', async () => {
    authFixture.givenAuthenticatedUser({id: 'bob-id'});
    noteFixture.givenExistingFolder(aFolder('inbox-id', 'INBOX').build());
    noteFixture.givenExistingNotes({
      folderId: 'inbox-id',
      notes: [
        aNote('note-id1')
          .withTime(new Date('2023-12-20T05:30:00.000Z'))
          .withContent('send email to Foo')
          .withAuthorId('bob-id')
          .withStatus(PublishingStatus.Dirty)
          .build(),
      ],
    });
    noteFixture.givenRemoteNotes('inbox-id', [
      {
        id: 'note-id3',
        authorId: 'bob-id',
        content: 'buy ananas',
        time: new Date('2023-10-31T06:30:00.000Z'),
      },
      {
        id: 'note-id2',
        authorId: 'bob-id',
        content: 'call the lawyer',
        time: new Date('2023-11-20T05:30:00.000Z'),
      },
    ]);
    await noteFixture.whenRefreshingFolder('inbox-id');
    noteFixture.thenRootStateShouldBe(
      {id: 'bob-id'},
      {
        id: 'inbox-id',
        name: 'INBOX',
        notes: [
          {
            id: 'note-id1',
            authorId: 'bob-id',
            content: 'send email to Foo',
            time: '2023-12-20T05:30:00.000Z',
            status: PublishingStatus.Dirty,
          },
          {
            id: 'note-id3',
            authorId: 'bob-id',
            content: 'buy ananas',
            time: '2023-10-31T06:30:00.000Z',
            status: PublishingStatus.Runnning,
          },
          {
            id: 'note-id2',
            authorId: 'bob-id',
            content: 'call the lawyer',
            time: '2023-11-20T05:30:00.000Z',
            status: PublishingStatus.Runnning,
          },
        ],
      },
    );
  });

  test('Example: There is one note and Bob pull changes on that note', async () => {
    authFixture.givenAuthenticatedUser({id: 'bob-id'});
    noteFixture.givenExistingFolder(aFolder('inbox-id', 'INBOX').build());
    noteFixture.givenExistingNotes({
      folderId: 'inbox-id',
      notes: [
        aNote('note-id1')
          .withTime(new Date('2023-09-20T05:30:00.000Z'))
          .withContent('send email to Foo')
          .withAuthorId('bob-id')
          .withStatus(PublishingStatus.Runnning)
          .build(),
      ],
    });
    noteFixture.givenRemoteNotes('inbox-id', [
      {
        id: 'note-id1',
        authorId: 'bob-id',
        content: 'send email to Foo and dont forget the tennis',
        time: new Date('2023-11-30T06:30:00.000Z'),
      },
    ]);
    await noteFixture.whenRefreshingFolder('inbox-id');
    noteFixture.thenRootStateShouldBe(
      {id: 'bob-id'},
      {
        id: 'inbox-id',
        name: 'INBOX',
        notes: [
          {
            id: 'note-id1',
            authorId: 'bob-id',
            content: 'send email to Foo and dont forget the tennis',
            time: '2023-11-30T06:30:00.000Z',
            status: PublishingStatus.Runnning,
          },
        ],
      },
    );
  });
});
