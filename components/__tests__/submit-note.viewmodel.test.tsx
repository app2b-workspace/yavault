import {renderViewModelHook, wrapperWithReduxStore} from './viewmodel.fixture';
import {FakeIdGeneratorAdapter} from '../../lib/notes/adapters/fake-id-generator.adapter';
import {submitNote} from '../../lib/notes/usecases/submit-a-note.usecase';
import {createTestStore} from '../../lib/store/create-test.store';
import {Store} from '../../lib/store/create.store';
import {aState} from '../../lib/store/state.builder';
import {
  SubmitNoteFormDependencies,
  useSubmitNoteViewModel,
} from '../submit-note.viewmodel';
import {act} from 'react-test-renderer';

let idGenerator: FakeIdGeneratorAdapter;
beforeEach(() => {
  idGenerator = new FakeIdGeneratorAdapter();
});
const createStore = (folderId: string = 'inbox-id') => {
  return createTestStore(
    aState().withFolder({id: folderId, name: 'INBOW'}).build(),
  );
};
const renderViewModel = (
  store: Store,
  dependencies: SubmitNoteFormDependencies,
  folderId = 'inbox-id',
) => {
  const wrapper = wrapperWithReduxStore(store);
  return renderViewModelHook(
    () => useSubmitNoteViewModel(folderId, dependencies),
    wrapper,
  );
};
describe('submit a note view model', () => {
  test('Example: submit note to inbox folder', async () => {
    idGenerator.willGeneratorNewId = 'note-id1';
    const store = createStore();
    const hookOutput = renderViewModel(store, {idGenerator});

    act(() => hookOutput.result.current.newContent('appeller le garage'));
    await act(() => {
      hookOutput.result.current.submit();
    });
    expect(store.getLastDispatchedUseCaseArgs(submitNote)).toEqual({
      content: 'appeller le garage',
      folderId: 'inbox-id',
      noteId: 'note-id1',
    });
    expect(hookOutput.result.current.canSubmit).toBe(true);
  });
  test('Example: cannot submit by default', async () => {
    idGenerator.willGeneratorNewId = 'note-id1';
    const store = createStore();
    const hookOutput = renderViewModel(store, {idGenerator});
    expect(hookOutput.result.current.canSubmit).toBe(false);
  });
  test('Example: cannot submit empty note', async () => {
    idGenerator.willGeneratorNewId = 'note-id1';
    const store = createStore();
    const hookOutput = renderViewModel(store, {idGenerator});
    await act(() => {
      hookOutput.result.current.submit();
    });
    expect(hookOutput.result.current.canSubmit).toBe(false);
  });
});
