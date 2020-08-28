import { resolvers as commonResolvers } from './common';
import { resolvers as userResolvers } from './user';
import { resolvers as categoryResolvers } from './category';
import { resolvers as positionResolvers } from './position';
import { resolvers as projectResolvers } from './project';

const allResolvers = [commonResolvers, userResolvers, categoryResolvers, positionResolvers, projectResolvers];

export { allResolvers };
