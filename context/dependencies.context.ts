import {createContext} from 'react';
import {Dependencies} from '../lib/store/create.store';
import {FakeFolderGatewayAdapter} from '../lib/notes/adapters/fake-folder-gateway.adapter';
import {FakeNoteGatewayAdapter} from '../lib/notes/adapters/fake-note-gateway.adapter';
import {FakeDateProviderAdapter} from '../lib/notes/adapters/fake-date-provider.adapter';
import {FakeIdGeneratorAdapter} from '../lib/notes/adapters/fake-id-generator.adapter';

export const DependenciesContext = createContext<Dependencies>({
  dateProvider: new FakeDateProviderAdapter(),
  folderGateway: new FakeFolderGatewayAdapter(),
  noteGateway: new FakeNoteGatewayAdapter(),
  idGenerator: new FakeIdGeneratorAdapter(),
});
