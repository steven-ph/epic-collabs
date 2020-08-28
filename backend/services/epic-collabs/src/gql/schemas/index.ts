import { typeDefs as commonTypeDefs } from './common';
import { typeDefs as userTypeDefs } from './user';
import { typeDefs as categoryTypeDefs } from './category';
import { typeDefs as positionTypeDefs } from './position';
import { typeDefs as projectTypeDefs } from './project';

const allTypeDefs = [commonTypeDefs, userTypeDefs, categoryTypeDefs, positionTypeDefs, projectTypeDefs];

export { allTypeDefs };
