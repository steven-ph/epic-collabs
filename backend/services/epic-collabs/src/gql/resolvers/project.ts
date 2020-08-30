import { property } from 'lodash';
import { IContext } from '../make-context';

export const resolvers = {
  Query: {
    projectById: (_, { id }, ctx: IContext) => ctx.Project.getProjectById(id),
    projectsByIds: (_, { ids }, ctx: IContext) => ctx.Project.getProjectsByIds(ids),
    projects: (_, __, ctx: IContext) => ctx.Project.getProjects()
  },
  Mutation: {
    newProject: (_, { input }, ctx: IContext) => ctx.User.createProject({ ...input, createdBy: ctx.viewer.id }),
    updateProject: async (_, { input }, ctx: IContext) => {
      const userId = ctx.viewer.id;
      const result = await ctx.User.updateProject({ ...input, updatedBy: userId });

      return { userId, projectId: input._id, success: !!result };
    }
  },
  Project: {
    createdBy: ({ createdBy }, _, ctx: IContext) => ctx.User.getUserById(createdBy),
    followers: ({ followers }, _, ctx: IContext) => ctx.User.getUsersByIds(followers),
    categories: ({ categories }, _, ctx: IContext) => ctx.Category.getCategoriesByIds(categories)
  },
  Collaborator: {
    user: ({ userId }, _, ctx: IContext) => ctx.User.getUserById(userId),
    position: ({ positionId }, _, ctx: IContext) => ctx.Position.getPositionById(positionId)
  },
  UpdateProjectResult: {
    _id: property('userId'),
    success: ({ success }) => !!success,
    project: ({ projectId }, _, ctx: IContext) => ctx.Project.getProjectById(projectId)
  }
};
