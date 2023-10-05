import {StateBuilder, aState} from '../../store/state.builder';
import {Store} from '../../store/create.store';
import {FailingNoteGatewayAdapter} from '../adapters/failing-note-gateway.adapter';
import {FakeDateProviderAdapter} from '../adapters/fake-date-provider.adapter';
import {FakeFolderGatewayAdapter} from '../adapters/fake-folder-gateway.adapter';
import {FakeNoteGatewayAdapter} from '../adapters/fake-note-gateway.adapter';
import {Folder} from '../models/folder.model';
import {Note, PublishingStatus} from '../models/note.model';
import {refreshFolder} from '../usecases/refresh-folder.usecase';
import {submitNote} from '../usecases/submit-a-note.usecase';
import {StoreBuilder} from '../../store/store.builder';
import {AuthUser} from '../../auth/reducers/auth.reducer';

type ExpectedFolder = {
  name: string;
  id: string;
  notes: {
    id: string;
    authorId: string;
    content: string;
    time: string;
    status: PublishingStatus;
  }[];
};
export class NoteFixture {
  store!: Store;
  constructor(
    private stateBuilder: StateBuilder,
    private dateProvider = new FakeDateProviderAdapter(),
    noteGateway = new FakeNoteGatewayAdapter(),
    private folderGateway = new FakeFolderGatewayAdapter(),
    private storeBuilder = new StoreBuilder(),
  ) {
    this.storeBuilder
      .withDateProvider(dateProvider)
      .withNoteGateway(noteGateway)
      .withFolderGateway(folderGateway)
      .withState(stateBuilder);
  }

  givenNowIs(now: Date) {
    this.dateProvider.nowIs = now;
  }
  givenExistingFolder(folder: Folder) {
    this.stateBuilder.withFolder(folder);
  }
  givenExistingNotes({folderId, notes}: {folderId: string; notes: Note[]}) {
    this.stateBuilder.withNotes(folderId, notes);
  }
  givenRemoteNotes(
    folderId: string,
    notes: {
      id: string;
      authorId: string;
      content: string;
      time: Date;
    }[],
  ) {
    this.folderGateway.responses = {
      folderId,
      notes: notes.map(note => ({
        id: note.id,
        authorId: note.authorId,
        content: note.content,
        time: note.time.toISOString(),
      })),
    };
  }
  givenSubmittingNoteWillFail(error: string) {
    this.storeBuilder.withNoteGateway(new FailingNoteGatewayAdapter(error));
  }
  async whenSubmittingNote({
    noteId,
    content,
    folderId,
  }: {
    noteId: string;
    content: string;
    folderId: string;
  }) {
    this.store = this.storeBuilder.build();
    await this.store.dispatch(
      submitNote({
        noteId,
        content,
        folderId,
      }),
    );
  }
  async whenRefreshingFolder(folderId: string) {
    this.store = this.storeBuilder.build();
    return this.store.dispatch(refreshFolder({folderId}));
  }
  thenRootStateShouldBe(
    {id: authUserId}: AuthUser,
    {id, name, notes}: ExpectedFolder,
    failure?: {noteId: string; error: string},
  ) {
    failure
      ? expect(this.store.getState()).toEqual(
          aState()
            .withAuthenticatedUser({id: authUserId})
            .withFolder({id, name})
            .withNotes(id, notes)
            .withNoteFailure({noteId: failure.noteId, error: failure.error})
            .build(),
        )
      : expect(this.store.getState()).toEqual(
          aState()
            .withAuthenticatedUser({id: authUserId})
            .withFolder({id, name})
            .withNotes(id, notes)
            .build(),
        );
  }
}
