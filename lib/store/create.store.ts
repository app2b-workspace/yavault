import {
  AnyAction,
  Middleware,
  ThunkDispatch,
  configureStore,
  createAction,
} from '@reduxjs/toolkit';
import {rootReducer} from './root.reducer';
import {DateProvider} from '../notes/models/date.provider';
import {NoteGateway} from '../notes/models/note.gateway';
import {FolderGateway} from '../notes/models/folder.gateway';
import {IdGenerator} from '../notes/models/id.generator';

export interface Dependencies {
  dateProvider: DateProvider;
  noteGateway: NoteGateway;
  folderGateway: FolderGateway;
  idGenerator: IdGenerator;
}

export const initialState = rootReducer(undefined, createAction(''));
export type RootState = typeof initialState;

export const createStore = ({
  state,
  dependencies,
}: {
  state: RootState;
  dependencies: Dependencies;
}) => {
  let lastUseCaseAction: AnyAction;
  let countDispatchedUseCasesActions = 0;
  const logLastUseCaseActionsMiddleware: Middleware =
    () => next => (action: AnyAction) => {
      if (
        action.type &&
        (action.type as string).startsWith('usecase') &&
        (action.type as string).endsWith('pending')
      ) {
        countDispatchedUseCasesActions++;
        lastUseCaseAction = action;
      }
      return next(action);
    };
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }).prepend(logLastUseCaseActionsMiddleware),
    preloadedState: state,
  });
  return {
    ...store,
    getLastUseCaseAction() {
      return lastUseCaseAction;
    },
    getCountDispatchedUseCasesActions() {
      return countDispatchedUseCasesActions;
    },
  };
};

export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>;
export type Store = ReturnType<typeof createStore>;
