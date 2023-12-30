export const isEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.length === 0;
