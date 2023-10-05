import {Folder} from './folder.model';

class FolderBuilder {
  notes: string[] = [];
  constructor(private readonly id: string, private readonly name: string) {}
  build(): Folder {
    return {
      id: this.id,
      name: this.name,
      notes: this.notes,
    };
  }
}

export const aFolder = (id: string, name: string) =>
  new FolderBuilder(id, name);
