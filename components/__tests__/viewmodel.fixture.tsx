import {renderHook} from '@testing-library/react-native';
import {Store} from '../../lib/store/create.store';
import React from 'react';
import {Provider} from 'react-redux';

export const wrapperWithReduxStore =
  (store: Store) =>
  ({children}: {children: React.ReactNode}) =>
    <Provider store={store}>{children}</Provider>;

export function renderViewModelHook<T>(hook: () => T, wrapper?: any) {
  return renderHook(
    hook,
    wrapper
      ? {
          wrapper,
        }
      : undefined,
  );
}
