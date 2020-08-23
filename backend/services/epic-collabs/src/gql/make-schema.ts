import { flow } from 'lodash';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { allTypeDefs } from './schemas';
import { allResolvers } from './resolvers';
import { authDirective } from './directives/auth';

const mergeTypeDefsAndResolvers = () => {
  const typeDefs = mergeTypeDefs(allTypeDefs);
  const resolvers = mergeResolvers(allResolvers);

  return { typeDefs, resolvers };
};

const attachDirectives = schema =>
  Object.assign(schema, {
    schemaDirectives: {
      auth: authDirective.directive
    }
  });

const attachScalars = schema =>
  Object.assign(schema, {
    typeDefs: [].concat(schema.typeDefs, authDirective.typeDef)
  });

const makeSchema = () => {
  const { typeDefs, resolvers } = mergeTypeDefsAndResolvers();

  const generateSchema = flow([attachDirectives, attachScalars, makeExecutableSchema]);

  return generateSchema({ typeDefs, resolvers });
};

export { makeSchema };
