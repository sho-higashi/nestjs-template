import { z } from 'zod';

const environmentSchema = z.object({
  DATABASE_URL: z.string(),
  ENV: z.enum(['development', 'production', 'staring', 'test']),
  PORT: z
    .string()
    .nullish()
    .refine((value) => {
      if (value === null) {
        return true;
      }

      const port = Number(value);

      return port > 0 && port <= 65535;
    })
    .transform((v) => (v ? 3000 : Number(v))),
});

export type Environment = z.infer<typeof environmentSchema>;

export const validate = (config: Record<string, unknown>) =>
  environmentSchema.parse(config);
