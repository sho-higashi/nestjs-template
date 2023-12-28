import * as dotenv from 'dotenv';

jest.retryTimes(2);

dotenv.config({ path: './../.env.test' });
