import { IContext } from '../make-context';

export const resolvers = {
  Query: {
    positionById: (_, { id }, ctx: IContext) => ctx.Position.getPositionById(id),
    positionsByIds: (_, { ids }, ctx: IContext) => ctx.Position.getPositionByIds(ids),
    positions: (_, __, ctx: IContext) => ctx.Position.getPositions()
  },
  Mutation: {
    newPosition: (_, { input }, ctx: IContext) => ctx.Position.createPosition({ ...input, createdBy: ctx.viewer.id })
  },
  Position: {
    createdBy: ({ createdBy }, _, ctx: IContext) => ctx.User.getUserById(createdBy),
    projects: ({ _id }, _, ctx: IContext) => ctx.Project.getProjectsByPositionId(_id)
  }
};
