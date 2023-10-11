import {NoteGateway, SubmitNoteParams} from '../models/note.gateway';

export class FakeNoteGatewayAdapter implements NoteGateway {
  complete(_: unknown): Promise<void> {
    return Promise.resolve();
  }
  submit(_: SubmitNoteParams): Promise<void> {
    return Promise.resolve();
  }
}
