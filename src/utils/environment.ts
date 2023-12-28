import { z } from 'zod';

const portSchema = z
  .string()
  .nullish()
  .refine((value) => {
    if (value === null || value === undefined) {
      return true;
    }

    const port = Number(value);

    return !Number.isNaN(port);
  })
  .transform((v) => (v ? Number(v) : 3000));

const environmentSchema = z.object({
  DATABASE_URL: z.string(),
  ENV: z.enum(['development', 'production', 'staring', 'test']),
  PORT: portSchema,
});

export type Environment = z.infer<typeof environmentSchema>;

export const validate = (config: Record<string, unknown>) =>
  environmentSchema.parse(config);
