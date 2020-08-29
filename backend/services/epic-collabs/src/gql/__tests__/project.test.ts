import { graphql } from 'graphql';
import { makeSchema } from '../make-schema';

const mockCategory = {
  _id: 'cat-id',
  name: 'some-name'
};

const mockProject = {
  _id: 'mock-id',
  slug: 'mock-slug',
  name: 'some-name',
  description: 'description',
  categories: ['cat-id']
};

const mockExpectedProject = {
  _id: 'mock-id',
  slug: 'mock-slug',
  name: 'some-name',
  description: 'description',
  categories: [
    {
      _id: 'cat-id',
      name: 'some-name'
    }
  ]
};

const projectContext = {
  getProjectById: jest.fn(),
  getProjectsByIds: jest.fn(),
  getAllProjects: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn()
};

const categoryContext = {
  getCategoriesByIds: jest.fn()
};

const viewer = {
  id: 'mock-userId'
};

const context = {
  Project: projectContext,
  Category: categoryContext,
  viewer
};

const FIELDS = `
  _id
  slug
  name
  description
  categories {
    _id
    name
  }
`;

describe('Project schema', () => {
  let schema;

  beforeEach(async () => {
    schema = await makeSchema();
  });

  describe('Query.projectById', () => {
    const query = `
      query projectById($id: String!) {
        projectById(id: $id) {
          ${FIELDS}
        }
      }
    `;

    it('should throw an error when there is no ids', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$id" of required type "String!" was not provided.');
    });

    it('should return a project when an id is provided', async () => {
      categoryContext.getCategoriesByIds.mockResolvedValue([mockCategory]);
      projectContext.getProjectById.mockResolvedValue(mockProject);

      const { data } = await graphql(schema, query, null, context, { id: 'mock-id' });

      expect(data.projectById).toEqual(mockExpectedProject);
    });
  });

  describe('Query.projectsByIds', () => {
    const query = `
      query projectsByIds($ids: [String!]!) {
        projectsByIds(ids: $ids) {
          ${FIELDS}
        }
      }
    `;

    it('should throw an error when there is no ids', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$ids" of required type "[String!]!" was not provided.');
    });

    it('should return projects when ids are provided', async () => {
      projectContext.getProjectsByIds.mockResolvedValue([mockProject]);

      const { data } = await graphql(schema, query, null, context, { ids: ['mock-id'] });

      expect(data.projectsByIds).toEqual([mockExpectedProject]);
    });
  });

  describe('Query.allProjects', () => {
    const query = `
      query allProjects {
        allProjects {
          ${FIELDS}
        }
      }
    `;

    it('should return all projects', async () => {
      categoryContext.getCategoriesByIds.mockResolvedValue([mockCategory]);
      projectContext.getAllProjects.mockResolvedValue([mockProject]);

      const { data } = await graphql(schema, query, null, context);

      expect(data.allProjects).toEqual([mockExpectedProject]);
    });
  });

  describe('Mutation.newProject', () => {
    const mutation = `
      mutation newProject($input: ProjectInput!) {
        newProject(input: $input) {
          ${FIELDS}
        }
      }
    `;

    it('should add a project', async () => {
      categoryContext.getCategoriesByIds.mockResolvedValue([mockCategory]);
      projectContext.createProject.mockResolvedValue(mockProject);

      const { data } = await graphql(schema, mutation, null, context, {
        input: { name: 'project name', slug: 'slug', description: 'description', categories: ['cat-id'] }
      });

      expect(data.newProject).toEqual(mockExpectedProject);
    });
  });

  describe('Mutation.updateProject', () => {
    const mutation = `
      mutation updateProject($input: ProjectInput!) {
        updateProject(input: $input) {
          ${FIELDS}
        }
      }
    `;

    it('should update a project', async () => {
      categoryContext.getCategoriesByIds.mockResolvedValue([mockCategory]);
      projectContext.updateProject.mockResolvedValue(mockProject);

      const { data } = await graphql(schema, mutation, null, context, {
        input: { name: 'project name', slug: 'slug', description: 'description', categories: ['cat-id'] }
      });

      expect(data.updateProject).toEqual(mockExpectedProject);
    });
  });
});
