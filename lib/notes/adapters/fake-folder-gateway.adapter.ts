import {
  FolderGateway,
  RefreshFolderRequest,
  RefreshFolderResponse,
} from '../models/folder.gateway';

export class FakeFolderGatewayAdapter implements FolderGateway {
  responses?: RefreshFolderResponse;
  refresh(_: RefreshFolderRequest): Promise<RefreshFolderResponse> {
    return Promise.resolve(this.responses!);
  }
}
