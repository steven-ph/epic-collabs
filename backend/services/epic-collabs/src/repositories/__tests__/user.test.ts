import { makeUserRepository, IUserRepository } from '../user';

const mockClear = jest.fn();
const mockLoad = jest.fn();
const mockLoadMany = jest.fn();
jest.mock('dataloader', () =>
  jest.fn(() => ({
    clear: mockClear,
    load: mockLoad,
    loadMany: mockLoadMany
  }))
);

const mockUser = {
  _id: 'johndoe',
  email: 'john@doe.com',
  username: 'john@doe.com',
  picture: 'picture',
  name: 'john doe',
  firstName: 'john',
  lastName: 'doe',
  bio: 'blah',
  createdAt: 12345,
  emailVerified: true
};

const mockFindOneAndUpdate = jest.fn();

const mockUserDb = {
  findOneAndUpdate: mockFindOneAndUpdate
};

describe('UserRepository', () => {
  let userRepo: IUserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepo = makeUserRepository({ userDb: mockUserDb });
  });

  describe('#handleLogin', () => {
    it('should upsert user in the db', async () => {
      mockFindOneAndUpdate.mockResolvedValue(mockUser);

      const res = await userRepo.handleLogin({ ...mockUser });

      expect(res).toEqual(mockUser);
      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockUser._id },
        { ...mockUser },
        { new: true, lean: true, upsert: true, omitUndefined: true }
      );

      expect(mockClear).toHaveBeenCalledTimes(2);
    });

    it('should not upsert user in the db if the input is invalid', () => {
      return expect(() => userRepo.handleLogin({ name: 'johndoe' })).rejects.toThrow();
    });
  });

  describe('#upsertUser', () => {
    it('should upsert user in the db', async () => {
      mockFindOneAndUpdate.mockResolvedValue(mockUser);

      const res = await userRepo.upsertUser({ ...mockUser });

      expect(res).toEqual(mockUser);
      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockUser._id },
        { ...mockUser },
        { new: true, lean: true, upsert: true, omitUndefined: true }
      );

      expect(mockClear).toHaveBeenCalledTimes(2);
    });

    it('should not upsert user in the db if the input is invalid', () => {
      return expect(() => userRepo.handleLogin({ name: 'johndoe' })).rejects.toThrow();
    });
  });

  describe('#getUserById', () => {
    it('should get user by id', async () => {
      mockLoad.mockResolvedValue(mockUser);

      const response = await userRepo.getUserById('johndoe');

      expect(response).toEqual(mockUser);
    });
  });

  describe('#getUsersByIds', () => {
    it('should get multiple users by ids', async () => {
      mockLoadMany.mockResolvedValue([mockUser]);

      const response = await userRepo.getUsersByIds(['johndoe']);

      expect(response).toEqual([mockUser]);
    });
  });

  describe('#getUserByEmail', () => {
    it('should get user by email', async () => {
      mockLoad.mockResolvedValue(mockUser);

      const response = await userRepo.getUserByEmail('john@doe.com');

      expect(response).toEqual(mockUser);
    });
  });

  describe('#getUsersByEmails', () => {
    it('should get multiple users by emails', async () => {
      mockLoadMany.mockResolvedValue([mockUser]);

      const response = await userRepo.getUsersByEmails(['john@doe.com']);

      expect(response).toEqual([mockUser]);
    });
  });
});
