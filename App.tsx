/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {Dependencies, createStore} from './lib/store/create.store';
import {NativeDateProvider} from './lib/notes/adapters/date-now-provider.adapter';
import {InMemoryFolderGatewayAdapter} from './lib/notes/adapters/inmemory-folder-gateway.adapter';
import {StateBuilder} from './lib/store/state.builder';
import {Provider} from 'react-redux';
import {RefreshFolderScreen} from './screens/notes/refresh-folder.screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DependenciesContext} from './context/dependencies.context';
import {NanoidGenerator} from './lib/notes/adapters/nanoid-generator.adapter';
import {aNote} from './lib/notes/models/node.builder';
import {InMemoryNoteGatewayAdapter} from './lib/notes/adapters/inmemory-note-gateway.adapter';
import {Note} from './lib/notes/models/note.model';
import {StyleSheet} from 'react-native';
import {Folder} from './lib/notes/models/folder.model';
const notes = [
  aNote('note-id1')
    .withAuthorId('audie-id')
    .withContent('Un message au hasard')
    .withCompletedStatus()
    .withTime(new Date('2023-10-10T14:38:12.890Z'))
    .build(),
  aNote('note-id2')
    .withAuthorId('audie-id')
    .withContent('Appeler la crèche')
    .withCompletedStatus()
    .withTime(new Date('2023-10-10T13:38:12.890Z'))
    .build(),
];
const inbox: Folder = {
  id: 'inbox-id',
  name: 'INBOW',
  notes: notes.map(n => n.id),
};
const dependencies: Dependencies = {
  dateProvider: new NativeDateProvider(),
  folderGateway: new InMemoryFolderGatewayAdapter(
    {
      [inbox.id]: notes,
    },
    {timeoutMax: 800},
  ),
  noteGateway: new InMemoryNoteGatewayAdapter(
    notes.reduce((acc: Record<string, Note>, current: Note) => {
      acc[current.id] = current;
      return acc;
    }, {}),
    {timeoutMax: 800},
  ),
  idGenerator: new NanoidGenerator(),
};

const store = createStore({
  state: new StateBuilder().withFolder(inbox).build(),
  dependencies,
});

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <StatusBar />
        <DependenciesContext.Provider value={dependencies}>
          <RefreshFolderScreen currentFolderId="inbox-id" />
        </DependenciesContext.Provider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
