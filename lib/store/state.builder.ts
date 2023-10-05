import {AuthUser} from '../auth/reducers/auth.reducer';
import {foldersAdapter} from '../notes/models/folder.model';
import {Note, notesAdapter} from '../notes/models/note.model';
import {RootState, initialState} from './create.store';
export class StateBuilder {
  constructor(private state: RootState = initialState) {}
  withAuthenticatedUser(user: AuthUser) {
    this.state = {
      ...this.state,
      auth: {currentUser: user},
    };
    return this;
  }
  withFolder({id, name}: {id: string; name: string}): StateBuilder {
    this.state = {
      ...this.state,
      folders: {
        ...this.state.folders,
        ...foldersAdapter.setOne(this.state.folders, {id, name, notes: []}),
      },
    };
    return this;
  }
  withNotes(folderId: string, notes: Note[]): StateBuilder {
    const folder = foldersAdapter
      .getSelectors()
      .selectById(this.state.folders, folderId);
    if (!folder) {
      return this;
    }
    this.state = {
      ...this.state,
      notes: {
        ...this.state.notes,
        ...notesAdapter.addMany(this.state.notes, notes),
      },
      folders: {
        ...this.state.folders,
        ...foldersAdapter.updateOne(this.state.folders, {
          id: folderId,
          changes: {
            notes: [...folder.notes, ...notes.map(n => n.id)],
          },
        }),
      },
    };
    return this;
  }
  withNoteFailure(failure: {noteId: string; error: string}): StateBuilder {
    this.state = {
      ...this.state,
      notesFailure: {
        ...this.state.notesFailure,
        [failure.noteId]: failure.error,
      },
    };
    return this;
  }
  build(): RootState {
    return this.state;
  }
}
export const aState = (state: RootState = initialState) =>
  new StateBuilder(state);
