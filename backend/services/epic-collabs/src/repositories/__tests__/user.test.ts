import { makeUserRepository, IUserRepository } from '..//user';

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
const mockExec = jest.fn();

const mockUserDb = {
  findOneAndUpdate: mockFindOneAndUpdate,
  find: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  in: jest.fn().mockReturnThis(),
  exec: mockExec
};

describe('UserRepository', () => {
  let userRepo: IUserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepo = makeUserRepository({ userDb: mockUserDb });
  });

  describe('#login', () => {
    it('should upsert user in the db', async () => {
      mockFindOneAndUpdate.mockResolvedValue(mockUser);

      const res = await userRepo.login({ ...mockUser });

      expect(res).toEqual(mockUser);
      expect(mockFindOneAndUpdate).toHaveBeenCalledWith({ _id: mockUser._id }, mockUser, { new: true, upsert: true, omitUndefined: true });
    });

    it('should not upsert user in the db if the input is invalid', async () => {
      const result = await userRepo.login({ name: 'johndoe' });

      expect(result).toEqual(null);
      expect(mockExec).not.toHaveBeenCalled();
      expect(mockFindOneAndUpdate).not.toHaveBeenCalled();
    });
  });

  describe('#getUserById', () => {
    it('should get user by id', async () => {
      mockExec.mockResolvedValue([mockUser]);

      const response = await userRepo.getUserById('johndoe');

      expect(response).toEqual(mockUser);
    });
  });

  describe('#getUsersByIds', () => {
    it('should get multiple users by ids', async () => {
      mockExec.mockResolvedValue([mockUser]);

      const response = await userRepo.getUsersByIds(['johndoe']);

      expect(response).toEqual([mockUser]);
    });
  });

  describe('#getUserByEmail', () => {
    it('should get user by email', async () => {
      mockExec.mockResolvedValue([mockUser]);

      const response = await userRepo.getUserByEmail('john@doe.com');

      expect(response).toEqual(mockUser);
    });
  });

  describe('#getUsersByEmails', () => {
    it('should get multiple users by emails', async () => {
      mockExec.mockResolvedValue([mockUser]);

      const response = await userRepo.getUsersByEmails(['john@doe.com']);

      expect(response).toEqual([mockUser]);
    });
  });
});
