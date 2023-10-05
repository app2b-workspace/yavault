import {DateProvider} from '../notes/models/date.provider';
import {FolderGateway} from '../notes/models/folder.gateway';
import {NoteGateway} from '../notes/models/note.gateway';
import {Store, createStore} from './create.store';
import {StateBuilder} from './state.builder';

export class StoreBuilder {
  private stateBuilder!: StateBuilder;
  private dateProvider!: DateProvider;
  private noteGateway!: NoteGateway;
  private folderGateway!: FolderGateway;
  constructor() {}
  withDateProvider(dateProvider: DateProvider): StoreBuilder {
    this.dateProvider = dateProvider;
    return this;
  }
  withNoteGateway(noteGateway: NoteGateway): StoreBuilder {
    this.noteGateway = noteGateway;
    return this;
  }
  withFolderGateway(folderGateway: FolderGateway): StoreBuilder {
    this.folderGateway = folderGateway;
    return this;
  }
  withState(state: StateBuilder) {
    this.stateBuilder = state;
    return this;
  }
  build(): Store {
    return createStore({
      state: this.stateBuilder.build(),
      dependencies: {
        dateProvider: this.dateProvider,
        folderGateway: this.folderGateway,
        noteGateway: this.noteGateway,
      },
    });
  }
}
