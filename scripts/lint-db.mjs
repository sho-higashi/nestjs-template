#!/usr/bin/env zx

import { $ } from 'zx';

const schemaPath = 'prisma/schema.prisma';
const lintDbSchemaPath = 'prisma/schema-copy-for-lint-db.prisma';

let code = 0;

try {
  await $`cp ${schemaPath} ${lintDbSchemaPath}`;
  await $`pnpm format:db --schema=${lintDbSchemaPath}`;
  await $`diff ${schemaPath} ${lintDbSchemaPath}`;
} catch (err) {
  code = 1;
  await $`echo "lint schema.prisma failed. please format by command 'pnpm format:db'"`;
} finally {
  await $`rm -rf ${lintDbSchemaPath}`;
  process.exit(code);
}
