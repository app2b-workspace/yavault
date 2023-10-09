import {DateProvider} from '../models/date.provider';

export class NativeDateProvider implements DateProvider {
  now(): Date {
    return new Date();
  }
}
