import { graphql } from 'graphql';
import { makeSchema } from '../make-schema';

const mockCategory = {
  _id: 'some-id',
  name: 'some-name'
};

const categoryContext = {
  getCategoryById: jest.fn(),
  getCategoriesByIds: jest.fn(),
  getCategories: jest.fn(),
  createCategory: jest.fn()
};

const viewer = {
  id: 'mock-userId'
};

const context = {
  Category: categoryContext,
  viewer
};

describe('Category schema', () => {
  let schema;

  beforeEach(async () => {
    schema = await makeSchema();
  });

  describe('Query.categoryById', () => {
    const query = `
      query categoryById($id: String!) {
        categoryById(id: $id) {
          _id
          name
        }
      }
    `;

    it('should throw an error when there is no ids', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$id" of required type "String!" was not provided.');
    });

    it('should return a category when an id is provided', async () => {
      categoryContext.getCategoryById.mockResolvedValue(mockCategory);

      const { data } = await graphql(schema, query, null, context, { id: 'some-id' });

      expect(data.categoryById).toEqual(mockCategory);
    });
  });

  describe('Query.categoriesByIds', () => {
    const query = `
      query categoriesByIds($ids: [String!]!) {
        categoriesByIds(ids: $ids) {
          _id
          name
        }
      }
    `;

    it('should throw an error when there is no ids', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$ids" of required type "[String!]!" was not provided.');
    });

    it('should return categories when ids are provided', async () => {
      categoryContext.getCategoriesByIds.mockResolvedValue([mockCategory]);

      const { data } = await graphql(schema, query, null, context, { ids: ['some-id'] });

      expect(data.categoriesByIds).toEqual([mockCategory]);
    });
  });

  describe('Query.categories', () => {
    const query = `
      query categories {
        categories {
          _id
          name
        }
      }
    `;

    it('should return categories', async () => {
      categoryContext.getCategories.mockResolvedValue([mockCategory]);

      const { data } = await graphql(schema, query, null, context);

      expect(data.categories).toEqual([mockCategory]);
    });
  });

  describe('Mutation.newCategory', () => {
    const mutation = `
      mutation newCategory($input: CategoryInput!) {
        newCategory(input: $input) {
          _id
          name
        }
      }
    `;

    it('should add a category', async () => {
      categoryContext.createCategory.mockResolvedValue(mockCategory);

      const { data } = await graphql(schema, mutation, null, context, { input: { name: 'some-name' } });

      expect(data.newCategory).toEqual(mockCategory);
    });
  });
});
