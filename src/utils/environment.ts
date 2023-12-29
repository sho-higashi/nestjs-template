import { z } from 'zod';

const environmentSchema = z.object({
  DATABASE_URL: z.string(),
  ENV: z.enum(['local', 'production', 'development', 'staging', 'test']),
  PORT: z
    .string()
    .nullish()
    .refine((value) => {
      if (value === null || value === undefined) {
        return true;
      }

      const port = Number(value);

      return !Number.isNaN(port);
    })
    .transform((v) => (v ? Number(v) : 3000)),
});

export type Environment = z.infer<typeof environmentSchema>;

export const validate = (config: Record<string, unknown>) =>
  environmentSchema.parse(config);

export const isEnvForDev = (env: Environment['ENV']) => {
  return ['local', 'test', 'development'].includes(env);
};
