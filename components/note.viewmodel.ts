export interface NoteViewModel {
  id: string;
  content: string;
  time: string;
  authorId: string;
  hasCompleted: () => boolean;
  complete(): Promise<unknown>;
}
