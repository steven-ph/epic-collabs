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
  Mutation: {
    updateProfile: async (_, { input }, ctx: IContext) => {
      const userId = ctx.viewer.id;
      const success = await ctx.User.updateProfile({ ...input, updatedBy: userId });

      return { userId, success: !!success };
    },
    joinProject: async (_, { input }, ctx: IContext) => {
      const userId = ctx.viewer.id;
      const success = await ctx.User.joinProject({ ...input, userId });

      return { userId, success: !!success, projectId: input.projectId };
    },
    followProject: async (_, { input }, ctx: IContext) => {
      const userId = ctx.viewer.id;
      const success = await ctx.User.followProject({ ...input, userId });

      return { userId, success: !!success, projectId: input.projectId };
    },
    unfollowProject: async (_, { input }, ctx: IContext) => {
      const userId = ctx.viewer.id;
      const success = await ctx.User.unfollowProject({ ...input, userId });

      return { userId, success: !!success, projectId: input.projectId };
    },
    leaveProject: async (_, { input }, ctx: IContext) => {
      const userId = ctx.viewer.id;
      const success = await ctx.User.leaveProject({ ...input, userId });

      return { userId, success: !!success, projectId: input.projectId };
    },
    removeUserFromProject: async (_, { input }, ctx: IContext) => {
      const ownerId = ctx.viewer.id;
      const success = await ctx.User.removeUserFromProject({ ...input, ownerId });

      return { ownerId, success: !!success, projectId: input.projectId };
    },
    removePositionFromProject: async (_, { input }, ctx: IContext) => {
      const userId = ctx.viewer.id;
      const success = await ctx.User.removePositionFromProject({ ...input, userId });

      return { userId, success: !!success, projectId: input.projectId };
    },
    changeProjectOwnership: async (_, { input }, ctx: IContext) => {
      const userId = ctx.viewer.id;
      const result = await ctx.User.changeProjectOwnership({ ...input, fromUserId: userId });

      return { userId, projectId: input.projectId, success: !!result };
    }
  },
  User: {
    createdProjects: ({ _id }, _, ctx: IContext) => ctx.Project.getProjectsByUserId(_id),
    followingProjects: ({ followingProjects }, _, ctx: IContext) => ctx.Project.getProjectsByIds(followingProjects),
    contributingProjects: ({ contributingProjects }, _, ctx: IContext) => ctx.Project.getProjectsByIds(contributingProjects)
  },
  UpdateProfileResult: {
    _id: property('userId'),
    success: ({ success }) => !!success,
    profile: ({ userId }, _, ctx: IContext) => ctx.User.getUserById(userId)
  },
  JoinProjectResult: {
    _id: property('userId'),
    success: ({ success }) => !!success,
    project: ({ projectId }, _, ctx: IContext) => ctx.Project.getProjectById(projectId)
  },
  FollowProjectResult: {
    _id: property('userId'),
    success: ({ success }) => !!success,
    project: ({ projectId }, _, ctx: IContext) => ctx.Project.getProjectById(projectId)
  },
  UnfollowProjectResult: {
    _id: property('userId'),
    success: ({ success }) => !!success,
    project: ({ projectId }, _, ctx: IContext) => ctx.Project.getProjectById(projectId)
  },
  LeaveProjectResult: {
    _id: property('userId'),
    success: ({ success }) => !!success,
    project: ({ projectId }, _, ctx: IContext) => ctx.Project.getProjectById(projectId)
  },
  RemoveUserFromProjectResult: {
    _id: property('ownerId'),
    success: ({ success }) => !!success,
    project: ({ projectId }, _, ctx: IContext) => ctx.Project.getProjectById(projectId)
  },
  RemovePositionFromProjectResult: {
    _id: property('userId'),
    success: ({ success }) => !!success,
    project: ({ projectId }, _, ctx: IContext) => ctx.Project.getProjectById(projectId)
  },
  ChangeProjectOwnershipResult: {
    _id: property('userId'),
    success: ({ success }) => !!success,
    project: ({ projectId }, _, ctx: IContext) => ctx.Project.getProjectById(projectId)
  }
};
