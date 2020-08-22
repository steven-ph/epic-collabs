import { resolvers as userResolvers } from './user';
import { resolvers as categoryResolvers } from './category';

const allResolvers = [userResolvers, categoryResolvers];

export { allResolvers };
