import { IContext } from '../make-context';

export const resolvers = {
  Query: {
    projectById: (_, { id }, ctx: IContext) => ctx.Project.getProjectById(id),
    projectsByIds: (_, { ids }, ctx: IContext) => ctx.Project.getProjectsByIds(ids),
    allProjects: (_, __, ctx: IContext) => ctx.Project.getAllProjects()
  },
  Mutation: {
    addProject: (_, { input }, ctx: IContext) => ctx.Project.addProject({ ...input, createdBy: ctx.viewer.id })
  },
  Project: {
    createdBy: ({ createdBy }, _, ctx: IContext) => ctx.User.getUserById(createdBy),
    followers: ({ followers }, _, ctx: IContext) => ctx.User.getUsersByIds(followers),
    categories: ({ categories }, _, ctx: IContext) => ctx.Category.getCategoriesByIds(categories)
  },
  Collaborator: {
    user: ({ userId }, _, ctx: IContext) => ctx.User.getUserById(userId),
    position: ({ positionId }, _, ctx: IContext) => ctx.Position.getPositionById(positionId)
  }
};
