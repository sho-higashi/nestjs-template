import { validate } from './environment';

describe('environment', () => {
  const base = {
    DATABASE_URL: 'postgres://postgres:password@localhost:5432/nestjs_template',
    ENV: 'local',
  };
  it('port specified', () => {
    expect(validate({ ...base, PORT: '3001' })).toEqual({
      ...base,
      PORT: 3001,
    });
  });
  it('port not specified', () => {
    expect(validate(base)).toEqual({
      ...base,
      PORT: 3000,
    });
  });
});
