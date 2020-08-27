import { graphql } from 'graphql';
import { makeSchema } from '../make-schema';

const mockPosition = {
  _id: 'some-id',
  name: 'some-name',
  createdBy: 'mock-userId'
};

const positionContext = {
  getPositionById: jest.fn(),
  getPositionByIds: jest.fn(),
  getAllPosition: jest.fn(),
  addPosition: jest.fn()
};

const viewer = {
  id: 'mock-userId'
};

const context = {
  Position: positionContext,
  viewer
};

describe('Position schema', () => {
  let schema;

  beforeEach(async () => {
    schema = await makeSchema();
  });

  describe('Query.positionById', () => {
    const query = `
      query positionById($id: String!) {
        positionById(id: $id) {
          _id
          name
          createdBy
        }
      }
    `;

    it('should throw an error when there is no ids', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$id" of required type "String!" was not provided.');
    });

    it('should return a position when an id is provided', async () => {
      positionContext.getPositionById.mockResolvedValue(mockPosition);

      const { data } = await graphql(schema, query, null, context, { id: 'some-id' });

      expect(data.positionById).toEqual(mockPosition);
    });
  });

  describe('Query.positionsByIds', () => {
    const query = `
      query positionsByIds($ids: [String!]!) {
        positionsByIds(ids: $ids) {
          _id
          name
          createdBy
        }
      }
    `;

    it('should throw an error when there is no ids', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$ids" of required type "[String!]!" was not provided.');
    });

    it('should return positions when ids are provided', async () => {
      positionContext.getPositionByIds.mockResolvedValue([mockPosition]);

      const { data } = await graphql(schema, query, null, context, { ids: ['some-id'] });

      expect(data.positionsByIds).toEqual([mockPosition]);
    });
  });

  describe('Query.allPositions', () => {
    const query = `
      query allPositions {
        allPositions {
          _id
          name
          createdBy
        }
      }
    `;

    it('should return all positions', async () => {
      positionContext.getAllPosition.mockResolvedValue([mockPosition]);

      const { data } = await graphql(schema, query, null, context);

      expect(data.allPositions).toEqual([mockPosition]);
    });
  });

  describe('Mutation.addPosition', () => {
    const mutation = `
      mutation addPosition($input: AddPositionInput!) {
        addPosition(input: $input) {
          _id
          name
          createdBy
        }
      }
    `;

    it('should add a position', async () => {
      positionContext.addPosition.mockResolvedValue(mockPosition);

      const { data } = await graphql(schema, mutation, null, context, { input: { name: 'some-name' } });

      expect(data.addPosition).toEqual(mockPosition);
    });
  });
});
