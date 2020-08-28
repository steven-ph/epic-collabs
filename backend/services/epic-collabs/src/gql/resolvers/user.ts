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
    projects: ({ projects }, _, ctx: IContext) => ctx.Project.getProjectsByIds(projects),
    followingProjects: ({ followingProjects }, _, ctx: IContext) => ctx.Project.getProjectsByIds(followingProjects)
  }
};
