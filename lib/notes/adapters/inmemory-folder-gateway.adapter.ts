import {
  FolderGateway,
  RefreshFolderRequest,
  RefreshFolderResponse,
} from '../models/folder.gateway';
import {Note} from '../models/note.model';

interface Options {
  timeoutMax: number;
}

export class InMemoryFolderGatewayAdapter implements FolderGateway {
  constructor(
    private notesByFolder: Record<string, Note[]>,
    private options: Options,
  ) {}
  refresh(request: RefreshFolderRequest): Promise<RefreshFolderResponse> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          folderId: request.folderId,
          notes: this.notesByFolder[request.folderId] || [],
        });
      }, this.options.timeoutMax);
    });
  }
}
