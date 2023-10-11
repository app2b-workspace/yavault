export interface SubmitNoteParams {
  noteId: string;
  authorId: string;
  content: string;
  folderId: string;
  time: string;
}
export interface NoteGateway {
  submit(params: SubmitNoteParams): Promise<void>;
  complete(params: {
    authorId: string;
    noteId: string;
    folderId: string;
  }): Promise<void>;
}
