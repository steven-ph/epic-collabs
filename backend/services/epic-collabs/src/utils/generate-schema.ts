import * as fs from 'fs';
import * as path from 'path';
import { printSchema } from 'graphql';
import { makeSchema } from '../gql/make-schema';

try {
  const outputPath = path.resolve(process.cwd(), 'schema.graphql');
  fs.writeFileSync(outputPath, printSchema(makeSchema()), 'utf-8');
} catch (error) {
  throw new Error(error);
}
