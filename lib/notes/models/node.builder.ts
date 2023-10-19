import {Note, PublishingStatus} from './note.model';

class NoteBuilder {
  private content?: string;
  private authorId?: string;
  private time?: string;
  private status?: PublishingStatus;
  constructor(private readonly noteId: string) {}
  withContent(content: string): NoteBuilder {
    this.content = content;
    return this;
  }
  withAuthorId(authorId: string): NoteBuilder {
    this.authorId = authorId;
    return this;
  }
  withTime(time: Date): NoteBuilder {
    this.time = time.toISOString();
    return this;
  }
  withStatus(status: PublishingStatus): NoteBuilder {
    this.status = status;
    return this;
  }
  withCompletedStatus(): NoteBuilder {
    return this.withStatus(PublishingStatus.Completed);
  }
  build(): Note {
    return {
      id: this.noteId,
      content: this.content!,
      authorId: this.authorId!,
      time: this.time!,
      status: this.status!,
    };
  }
}
export const aNote = (noteId: string) => new NoteBuilder(noteId);
