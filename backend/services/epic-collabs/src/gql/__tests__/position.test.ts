import { graphql } from 'graphql';
import { makeSchema } from '../make-schema';

const mockUser = {
  _id: 'mock-userId',
  name: 'some-name'
};

const mockPosition = {
  _id: 'some-id',
  name: 'some-name',
  createdBy: 'mock-userId'
};

const mockExpectedPosition = {
  _id: 'some-id',
  name: 'some-name',
  createdBy: {
    _id: 'mock-userId',
    name: 'some-name'
  }
};

const positionContext = {
  getPositionById: jest.fn(),
  getPositionByIds: jest.fn(),
  getPositions: jest.fn(),
  createPosition: jest.fn()
};

const userContext = {
  getUserById: jest.fn()
};

const viewer = {
  id: 'mock-userId'
};

const context = {
  Position: positionContext,
  User: userContext,
  viewer
};

const FIELDS = `
  _id
  name
  createdBy {
    _id
    name
  }
`;

describe('Position schema', () => {
  let schema;

  beforeEach(async () => {
    schema = await makeSchema();
  });

  describe('Query.positionById', () => {
    const query = `
      query positionById($id: String!) {
        positionById(id: $id) {
          ${FIELDS}
        }
      }
    `;

    it('should throw an error when there is no ids', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$id" of required type "String!" was not provided.');
    });

    it('should return a position when an id is provided', async () => {
      userContext.getUserById.mockResolvedValue(mockUser);
      positionContext.getPositionById.mockResolvedValue(mockPosition);

      const { data } = await graphql(schema, query, null, context, { id: 'some-id' });

      expect(data.positionById).toEqual(mockExpectedPosition);
    });
  });

  describe('Query.positionsByIds', () => {
    const query = `
      query positionsByIds($ids: [String!]!) {
        positionsByIds(ids: $ids) {
          ${FIELDS}
        }
      }
    `;

    it('should throw an error when there is no ids', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$ids" of required type "[String!]!" was not provided.');
    });

    it('should return positions when ids are provided', async () => {
      userContext.getUserById.mockResolvedValue(mockUser);
      positionContext.getPositionByIds.mockResolvedValue([mockPosition]);

      const { data } = await graphql(schema, query, null, context, { ids: ['some-id'] });

      expect(data.positionsByIds).toEqual([mockExpectedPosition]);
    });
  });

  describe('Query.positions', () => {
    const query = `
      query positions {
        positions {
          ${FIELDS}
        }
      }
    `;

    it('should return positions', async () => {
      userContext.getUserById.mockResolvedValue(mockUser);
      positionContext.getPositions.mockResolvedValue([mockPosition]);

      const { data } = await graphql(schema, query, null, context);

      expect(data.positions).toEqual([mockExpectedPosition]);
    });
  });

  describe('Mutation.newPosition', () => {
    const mutation = `
      mutation newPosition($input: PositionInput!) {
        newPosition(input: $input) {
          ${FIELDS}
        }
      }
    `;

    it('should add a position', async () => {
      userContext.getUserById.mockResolvedValue(mockUser);
      positionContext.createPosition.mockResolvedValue(mockPosition);

      const { data } = await graphql(schema, mutation, null, context, { input: { name: 'some-name' } });

      expect(data.newPosition).toEqual(mockExpectedPosition);
    });
  });
});
