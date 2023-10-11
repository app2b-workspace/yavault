import {
  FolderGateway,
  NoteResponse,
  RefreshFolderRequest,
  RefreshFolderResponse,
} from '../models/folder.gateway';

interface Options {
  timeoutMax: number;
}

export class InMemoryFolderGatewayAdapter implements FolderGateway {
  constructor(
    private responsesByFolder: Record<string, NoteResponse[]>,
    private options: Options,
  ) {}
  refresh(request: RefreshFolderRequest): Promise<RefreshFolderResponse> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          folderId: request.folderId,
          notes: this.responsesByFolder[request.folderId] || [],
        });
      }, this.options.timeoutMax);
    });
  }
}
