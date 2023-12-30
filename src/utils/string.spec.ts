import { isEmptyString } from './string';

describe('isEmptyString', () => {
  it('should return true if the input is an empty string', () => {
    const input = '';
    const result = isEmptyString(input);
    expect(result).toBe(true);
  });

  it('should return false if the input is a non-empty string', () => {
    const input = 'not empty';
    const result = isEmptyString(input);
    expect(result).toBe(false);
  });

  it('should return false if the input is not a string', () => {
    const input = 123;
    const result = isEmptyString(input);
    expect(result).toBe(false);
  });

  it('should return false if the input is null', () => {
    const input = null;
    const result = isEmptyString(input);
    expect(result).toBe(false);
  });

  it('should return false if the input is undefined', () => {
    const input = undefined;
    const result = isEmptyString(input);
    expect(result).toBe(false);
  });
});
