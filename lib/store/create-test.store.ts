import {AsyncThunk, isAsyncThunkAction} from '@reduxjs/toolkit';
import {FakeDateProviderAdapter} from '../notes/adapters/fake-date-provider.adapter';
import {FakeFolderGatewayAdapter} from '../notes/adapters/fake-folder-gateway.adapter';
import {FakeNoteGatewayAdapter} from '../notes/adapters/fake-note-gateway.adapter';
import {Dependencies, RootState, createStore} from './create.store';
import {FakeIdGeneratorAdapter} from '../notes/adapters/fake-id-generator.adapter';

export const createTestStore = (
  state: RootState,
  {
    dateProvider = new FakeDateProviderAdapter(),
    folderGateway = new FakeFolderGatewayAdapter(),
    noteGateway = new FakeNoteGatewayAdapter(),
    idGenerator = new FakeIdGeneratorAdapter(),
  }: Partial<Dependencies> = {},
) => {
  const store = createStore({
    state,
    dependencies: {dateProvider, folderGateway, noteGateway, idGenerator},
  });
  return {
    ...store,
    getLastDispatchedUseCaseArgs(useCase: AsyncThunk<any, any, any>) {
      if (!store.getLastUseCaseAction()) {
        return;
      }

      if (store.getLastUseCaseAction().type !== useCase.pending.toString()) {
        return;
      }

      if (!isAsyncThunkAction(store.getLastUseCaseAction())) {
        return;
      }

      return store.getLastUseCaseAction().meta.arg ?? '';
    },
  };
};
