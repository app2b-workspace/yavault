import {createReducer} from '@reduxjs/toolkit';
import {RootState} from '../../store/create.store';

export interface AuthUser {
  id: string;
}

interface AuthState {
  currentUser?: AuthUser;
}

export const authReducer = createReducer<AuthState>(
  {
    currentUser: undefined,
  },
  _ => {},
);

export const selectAuthenticatedUserId = (state: RootState): string => {
  return state.auth.currentUser?.id || '';
};
