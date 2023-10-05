import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, Dependencies, RootState} from './create.store';

export const createThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: Dependencies;
}>();
