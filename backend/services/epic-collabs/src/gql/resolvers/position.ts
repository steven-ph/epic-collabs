import { IContext } from '../make-context';

export const resolvers = {
  Query: {
    positionById: (_, { id }, ctx: IContext) => ctx.Position.getPositionById(id),
    positionsByIds: (_, { ids }, ctx: IContext) => ctx.Position.getPositionByIds(ids),
    allPositions: (_, __, ctx: IContext) => ctx.Position.getAllPosition()
  },
  Mutation: {
    addPosition: (_, { input }, ctx: IContext) => ctx.Position.addPosition({ ...input, createdBy: ctx.viewer.id })
  },
  Position: {
    createdBy: ({ createdBy }, _, ctx: IContext) => ctx.User.getUserById(createdBy),
    projects: ({ _id }, _, ctx: IContext) => ctx.Project.getProjectsByPositionId(_id)
  }
};
