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

export interface Dependencies {
  dateProvider: DateProvider;
  noteGateway: NoteGateway;
  folderGateway: FolderGateway;
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
  const logLastUseCaseActionsMiddleware: Middleware =
    () => next => (action: AnyAction) => {
      if (
        action.type &&
        (action.type as string).startsWith('usecase') &&
        (action.type as string).endsWith('pending')
      ) {
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
  };
};

export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>;
export type Store = ReturnType<typeof createStore>;
