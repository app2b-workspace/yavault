import {IdGenerator} from '../models/id.generator';

export class FakeIdGeneratorAdapter implements IdGenerator {
  willGeneratorNewId: string = '';
  generate(): string {
    return this.willGeneratorNewId;
  }
}
