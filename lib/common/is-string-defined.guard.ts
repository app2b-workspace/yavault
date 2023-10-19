import {isDefinedOrNotNullGuard} from './is-defined-or-not-null.guard';

export const isNotEmptyStringGuard = (
  value: string | undefined | null,
): boolean => {
  return isDefinedOrNotNullGuard(value) && value.trim().length > 0;
};
