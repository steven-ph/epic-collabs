import { resolvers as userResolvers } from './user';
import { resolvers as categoryResolvers } from './category';
import { resolvers as positionResolvers } from './position';

const allResolvers = [userResolvers, categoryResolvers, positionResolvers];

export { allResolvers };
