import {NoteGateway, SubmitNoteParams} from '../models/note.gateway';
import {Note, PublishingStatus} from '../models/note.model';

interface Options {
  timeoutMax: number;
}

export class InMemoryNoteGatewayAdapter implements NoteGateway {
  constructor(
    private notesById: Record<string, Note>,
    private options: Options,
  ) {}
  submit(params: SubmitNoteParams): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.notesById[params.noteId] = {
          id: params.noteId,
          content: params.content,
          authorId: params.authorId,
          status: PublishingStatus.Runnning,
          time: params.time,
        };
        resolve();
      }, this.options.timeoutMax);
    });
  }
  complete(params: {
    authorId: string;
    noteId: string;
    folderId: string;
  }): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.notesById[params.noteId].status = PublishingStatus.Completed;
        resolve();
      }, this.options.timeoutMax);
    });
  }
}
