import {NoteGateway, SubmitNoteParams} from '../models/note.gateway';

export class FakeNoteGatewayAdapter implements NoteGateway {
  submit(_: SubmitNoteParams): Promise<void> {
    return Promise.resolve();
  }
}
