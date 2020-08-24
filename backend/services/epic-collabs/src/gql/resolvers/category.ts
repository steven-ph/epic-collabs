import { property } from 'lodash';
import { IContext } from '../make-context';

export const resolvers = {
  Query: {
    categoryById: (_, { id }, ctx: IContext) => ctx.Category.getCategoryById(id),
    categoriesByIds: (_, { ids }, ctx: IContext) => ctx.Category.getCategoriesByIds(ids),
    allCategories: (_, __, ctx: IContext) => ctx.Category.getAllCategories()
  },
  Mutation: {
    addCategory: (_, { input }, ctx: IContext) => ctx.Category.addCategory(input)
  },
  Category: {
    id: property('_id')
  }
};
