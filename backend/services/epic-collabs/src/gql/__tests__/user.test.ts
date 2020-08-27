import { graphql } from 'graphql';
import { makeSchema } from '../make-schema';

const mockUser = {
  _id: 'johndoe',
  email: 'john@doe.com'
};

const userContext = {
  getUserById: jest.fn(),
  getUsersByIds: jest.fn(),
  getUserByEmail: jest.fn(),
  getUsersByEmails: jest.fn()
};

const viewer = {
  id: 'mock-userId'
};

const context = {
  User: userContext,
  viewer
};

describe('User schema', () => {
  let schema;

  beforeEach(async () => {
    schema = await makeSchema();
  });

  describe('Query.me', () => {
    const query = `
      query me {
        me {
          _id
          email
        }
      }
    `;

    it('should throw an error when there is no userIds', async () => {
      const { errors } = await graphql(schema, query, null, {
        User: userContext
      });

      return expect(errors[0].message).toEqual('This field requires ["VIEWER"] access');
    });

    it('should return user info for the viewer', () => {
      userContext.getUserById.mockResolvedValue(mockUser);

      return graphql(schema, query, null, context).then(({ data }) => {
        expect(data).toEqual({ me: mockUser });
      });
    });
  });

  describe('Query.userById', () => {
    const query = `
      query userById($id: String!) {
        userById(id: $id) {
          _id
          email
        }
      }
    `;

    it('should throw an error when there is no userIds', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$id" of required type "String!" was not provided.');
    });

    it('should return user info when userId is provided', async () => {
      userContext.getUserById.mockResolvedValue(mockUser);

      const { data } = await graphql(schema, query, null, context, { id: 'johndoe' });

      expect(data.userById).toEqual(mockUser);
    });
  });

  describe('Query.usersByIds', () => {
    const query = `
      query usersByIds($ids: [String!]!) {
        usersByIds(ids: $ids) {
          _id
          email
        }
      }
    `;

    it('should throw an error when there is no userIds', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$ids" of required type "[String!]!" was not provided.');
    });

    it('should return user info when userIds are provided', async () => {
      userContext.getUsersByIds.mockResolvedValue([mockUser]);

      const { data } = await graphql(schema, query, null, context, { ids: ['johndoe'] });

      expect(data.usersByIds).toEqual([mockUser]);
    });
  });

  describe('Query.userByEmail', () => {
    const query = `
      query userByEmail($email: String!) {
        userByEmail(email: $email) {
          _id
          email
        }
      }
    `;

    it('should throw an error when there is no email provided', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$email" of required type "String!" was not provided.');
    });

    it('should return user info when email is provided', async () => {
      userContext.getUserByEmail.mockResolvedValue(mockUser);

      const { data } = await graphql(schema, query, null, context, { email: 'john@doe.com' });

      expect(data.userByEmail).toEqual(mockUser);
    });
  });

  describe('Query.usersByEmails', () => {
    const query = `
      query usersByEmails($emails: [String!]!) {
        usersByEmails(emails: $emails) {
          _id
          email
        }
      }
    `;

    it('should throw an error when there is no emails', async () => {
      const { errors } = await graphql(schema, query, null, context);

      return expect(errors[0].message).toEqual('Variable "$emails" of required type "[String!]!" was not provided.');
    });

    it('should return user info when emails are provided', async () => {
      userContext.getUsersByEmails.mockResolvedValue([mockUser]);

      const { data } = await graphql(schema, query, null, context, { emails: ['john@doe.com'] });

      expect(data.usersByEmails).toEqual([mockUser]);
    });
  });
});
