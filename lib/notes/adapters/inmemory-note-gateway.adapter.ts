import {
  FolderGateway,
  NoteResponse,
  RefreshFolderRequest,
  RefreshFolderResponse,
} from '../models/folder.gateway';

export class InMemoryFolderGatewayAdapter implements FolderGateway {
  responses: Record<string, NoteResponse[]> = {};
  constructor() {}
  refresh(request: RefreshFolderRequest): Promise<RefreshFolderResponse> {
    if (!this.responses[request.folderId]) {
      return Promise.resolve({
        folderId: request.folderId,
        notes: [],
      });
    }
    return Promise.resolve({
      folderId: request.folderId,
      notes: this.responses[request.folderId],
    });
  }
}
