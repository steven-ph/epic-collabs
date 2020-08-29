import { property } from 'lodash';
import { IContext } from '../make-context';

export const resolvers = {
  Query: {
    projectById: (_, { id }, ctx: IContext) => ctx.Project.getProjectById(id),
    projectsByIds: (_, { ids }, ctx: IContext) => ctx.Project.getProjectsByIds(ids),
    allProjects: (_, __, ctx: IContext) => ctx.Project.getAllProjects()
  },
  Mutation: {
    newProject: (_, { input }, ctx: IContext) => ctx.Project.createProject({ ...input, createdBy: ctx.viewer.id }),
    updateProject: async (_, { input }, ctx: IContext) => {
      const result = await ctx.Project.updateProject({ ...input, updatedBy: ctx.viewer.id });

      return { _id: input._id, success: !!result };
    },
    changeProjectOwnership: async (_, { input }, ctx: IContext) => {
      const result = await ctx.Project.changeProjectOwnership({ ...input, fromUserId: ctx.viewer.id });

      return { _id: input.projectId, success: !!result };
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
    _id: property('_id'),
    project: ({ _id }, _, ctx: IContext) => ctx.Project.getProjectById(_id)
  },
  ChangeProjectOwnershipResult: {
    _id: property('_id'),
    project: ({ _id }, _, ctx: IContext) => ctx.Project.getProjectById(_id)
  }
};
