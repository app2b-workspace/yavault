import {NoteGateway, SubmitNoteParams} from '../models/note.gateway';

export class FailingNoteGatewayAdapter implements NoteGateway {
  constructor(private lastFailure: string) {}
  submit(_: SubmitNoteParams): Promise<void> {
    return Promise.reject(this.lastFailure);
  }
}
