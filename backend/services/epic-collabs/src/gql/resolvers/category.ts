import { IContext } from '../make-context';

export const resolvers = {
  Query: {
    categoryById: (_, { id }, ctx: IContext) => ctx.Category.getCategoryById(id),
    categoriesByIds: (_, { ids }, ctx: IContext) => ctx.Category.getCategoriesByIds(ids),
    allCategories: (_, __, ctx: IContext) => ctx.Category.getAllCategories()
  },
  Mutation: {
    newCategory: (_, { input }, ctx: IContext) => ctx.Category.createCategory({ ...input, createdBy: ctx.viewer.id })
  },
  Category: {
    createdBy: ({ createdBy }, _, ctx: IContext) => ctx.User.getUserById(createdBy),
    projects: ({ _id }, _, ctx: IContext) => ctx.Project.getProjectsByCategoryId(_id)
  }
};
