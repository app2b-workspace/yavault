import {
  FolderGateway,
  NoteResponse,
  RefreshFolderRequest,
  RefreshFolderResponse,
} from '../models/folder.gateway';

export class InMemoryFolderGatewayAdapter implements FolderGateway {
  constructor(private responsesByFolder: Record<string, NoteResponse[]>) {}
  refresh(request: RefreshFolderRequest): Promise<RefreshFolderResponse> {
    return Promise.resolve({
      folderId: request.folderId,
      notes: this.responsesByFolder[request.folderId] || [],
    });
  }
}
