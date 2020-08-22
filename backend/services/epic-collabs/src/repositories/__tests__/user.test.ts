const mockError = jest.fn();
jest.mock('../../utils/logger', () => ({
  logger: { error: mockError }
}));

import { makeUserRepository, IUserRepository } from '../user';

const mockUser = {
  userId: 'johndoe',
  email: 'john@doe.com',
  username: 'johndoe',
  picture: 'picture',
  firstName: 'john',
  lastName: 'doe'
};

const mockCreate = jest.fn();
const mockExec = jest.fn();

const mockUserDb = {
  create: mockCreate,
  find: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnValue({
      in: jest.fn().mockReturnValue({
        exec: mockExec
      })
    })
  })
};

describe('UserRepository', () => {
  let userRepo: IUserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepo = makeUserRepository({ userDb: mockUserDb });
  });

  describe('#login', () => {
    it('should create a new user in the db if not exists', async () => {
      mockExec.mockResolvedValue([]);
      mockCreate.mockResolvedValue(mockUser);

      const created = await userRepo.login({ ...mockUser });

      expect(created).toEqual(mockUser);
      expect(mockCreate).toHaveBeenCalledWith(mockUser);
    });

    it('should not create an user in the db if user already exists', async () => {
      mockExec.mockResolvedValue([mockUser]);

      const result = await userRepo.login({ ...mockUser });

      expect(result).toEqual(null);
      expect(mockCreate).not.toHaveBeenCalled();
    });

    it('should not create an user in the db if the input is invalid', async () => {
      mockExec.mockResolvedValue([mockUser]);

      const result = await userRepo.login({ userId: 'johndoe' });

      expect(result).toEqual(null);
      expect(mockCreate).not.toHaveBeenCalled();
    });
  });

  describe('#createUser', () => {
    it('should create user', async () => {
      mockCreate.mockResolvedValue(mockUser);

      const created = await userRepo.createUser({ ...mockUser });

      expect(mockCreate).toHaveBeenCalledWith(mockUser);
      expect(created).toEqual(mockUser);
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
