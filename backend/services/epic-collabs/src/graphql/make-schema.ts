import { flow, merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import * as rootSchema from './schemas/root';

const mergeTypeDefsAndResolvers = schemas =>
  schemas.reduce(
    (acc, { typeDefs, resolvers }) => ({
      typeDefs: acc.typeDefs.concat(typeDefs),
      resolvers: merge(acc.resolvers, resolvers)
    }),
    {
      typeDefs: [],
      resolvers: {}
    }
  );

const attachDirectives = schema => Object.assign(schema, {});

const attachScalars = schema => Object.assign(schema, {});

const makeSchema = () => {
  const schemas = [rootSchema];

  const generateSchema = flow([mergeTypeDefsAndResolvers, attachDirectives, attachScalars, makeExecutableSchema]);

  return generateSchema(schemas);
};

export { makeSchema };
