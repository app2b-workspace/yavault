/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createStore} from './lib/store/create.store';
import {NativeDateProvider} from './lib/notes/adapters/date-now-provider.adapter';
import {InMemoryFolderGatewayAdapter} from './lib/notes/adapters/inmemory-folder-gateway.adapter';
import {FakeNoteGatewayAdapter} from './lib/notes/adapters/fake-note-gateway.adapter';
import {StateBuilder} from './lib/store/state.builder';
import {Provider} from 'react-redux';
import {NotesByFolderScreen} from './screens/notes/notes-by-folder.screen';

const store = createStore({
  state: new StateBuilder().withFolder({id: 'inbox-id', name: 'INBOX'}).build(),
  dependencies: {
    dateProvider: new NativeDateProvider(),
    folderGateway: new InMemoryFolderGatewayAdapter(
      {
        ['inbox-id']: [
          {
            authorId: 'audie-id',
            content: 'Un message au hasard',
            id: 'note-id1',
            time: '2023-10-10T14:38:12.890Z',
          },
          {
            authorId: 'audie-id',
            content: 'Appeler la crèche',
            id: 'note-id2',
            time: '2023-10-10T13:38:12.890Z',
          },
          {
            authorId: 'audie-id',
            content: 'Appeler le ski',
            id: 'note-id2',
            time: '2023-10-10T12:38:12.890Z',
          },
        ],
      },
      {timeoutMax: 600},
    ),
    noteGateway: new FakeNoteGatewayAdapter(),
  },
});

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar />
      <NotesByFolderScreen currentFolderId="inbox-id" />
    </Provider>
  );
}

export default App;
