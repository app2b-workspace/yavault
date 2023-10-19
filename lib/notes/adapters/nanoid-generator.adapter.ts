import {nanoid} from '@reduxjs/toolkit';
import {IdGenerator} from '../models/id.generator';

export class NanoidGenerator implements IdGenerator {
  generate(): string {
    return nanoid();
  }
}
