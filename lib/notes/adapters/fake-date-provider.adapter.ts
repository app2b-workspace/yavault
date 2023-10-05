import {DateProvider} from '../models/date.provider';

export class FakeDateProviderAdapter implements DateProvider {
  nowIs: Date | undefined;
  now(): Date {
    return this.nowIs as Date;
  }
}
