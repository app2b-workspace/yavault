import {NoteGateway, SubmitNoteParams} from '../models/note.gateway';

export class FakeAsyncNoteGatewayAdapter implements NoteGateway {
  constructor(private config: {timeout: number}) {}
  complete(_: unknown): Promise<void> {
    return Promise.resolve(resolve => {
      setTimeout(() => resolve(), this.config.timeout);
    });
  }
  submit(_: SubmitNoteParams): Promise<void> {
    return Promise.resolve(resolve => {
      setTimeout(() => resolve(), this.config.timeout);
    });
  }
}
