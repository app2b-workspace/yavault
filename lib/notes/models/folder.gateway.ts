interface NoteResponse {
  id: string;
  content: string;
  authorId: string;
  time: string;
}
export interface RefreshFolderResponse {
  notes: NoteResponse[];
  folderId: string;
}
export interface RefreshFolderRequest {
  authenticatedUserId: string;
  folderId: string;
}

export interface FolderGateway {
  refresh(request: RefreshFolderRequest): Promise<RefreshFolderResponse>;
}
