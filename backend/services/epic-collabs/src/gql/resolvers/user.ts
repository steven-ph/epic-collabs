import { property } from 'lodash';
import { IContext } from '../make-context';

export const resolvers = {
  Query: {
    me: (_, __, ctx: IContext) => {
      const userId = ctx.viewer.id;

      return ctx.User.getUserById(userId);
    }
  },
  User: {
    id: property('userId')
  }
};
