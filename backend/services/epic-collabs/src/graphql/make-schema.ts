import { flow } from 'lodash';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { allTypeDefs } from './schemas';
import { allResolvers } from './resolvers';

const mergeTypeDefsAndResolvers = () => {
  const typeDefs = mergeTypeDefs(allTypeDefs);
  const resolvers = mergeResolvers(allResolvers);

  return { typeDefs, resolvers };
};

const attachDirectives = schema => Object.assign(schema, {});
const attachScalars = schema => Object.assign(schema, {});

const makeSchema = () => {
  const { typeDefs, resolvers } = mergeTypeDefsAndResolvers();

  const generateSchema = flow([attachDirectives, attachScalars, makeExecutableSchema]);

  return generateSchema({ typeDefs, resolvers });
};

export { makeSchema };
