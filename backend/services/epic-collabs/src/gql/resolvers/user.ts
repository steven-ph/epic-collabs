import { property } from 'lodash';
import { IContext } from '../make-context';

export const resolvers = {
  Query: {
    me: (_, __, ctx: IContext) => ctx.User.getUserById(ctx.viewer.id),
    userById: (_, { id }, ctx: IContext) => ctx.User.getUserById(id),
    usersByIds: (_, { ids }, ctx: IContext) => ctx.User.getUsersByIds(ids),
    userByEmail: (_, { email }, ctx: IContext) => ctx.User.getUserByEmail(email),
    usersByEmails: (_, { emails }, ctx: IContext) => ctx.User.getUsersByEmails(emails)
  },
  User: {
    id: property('userId')
  }
};
