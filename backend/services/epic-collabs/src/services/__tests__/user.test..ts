import { makeUserService } from '../user';

const mockLogin = jest.fn();
const mockGetById = jest.fn();
const mockGetByIds = jest.fn();
const mockGetByEmail = jest.fn();
const mockGetByEmails = jest.fn();

const mockRepo = {
  login: mockLogin,
  upsertUser: jest.fn(),
  getUserById: mockGetById,
  getUsersByIds: mockGetByIds,
  getUserByEmail: mockGetByEmail,
  getUsersByEmails: mockGetByEmails
};

const mockUser = {
  _id: 'mock-id',
  name: 'some-name',
  email: 'some-email'
};

describe('UserService', () => {
  const service = makeUserService({ userRepo: mockRepo });

  describe('getUserById', () => {
    it('should get user by id', async () => {
      mockGetById.mockResolvedValue(mockUser);

      const res = await service.getUserById('mock-id');

      expect(res).toEqual(mockUser);
      expect(mockGetById).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getUsersByIds', () => {
    it('should get categories by ids', async () => {
      mockGetByIds.mockResolvedValue([mockUser]);

      const res = await service.getUsersByIds(['mock-id']);

      expect(res).toEqual([mockUser]);
      expect(mockGetByIds).toHaveBeenCalledWith(['mock-id']);
    });
  });

  describe('getUserByEmail', () => {
    it('should get user by email', async () => {
      mockGetByEmail.mockResolvedValue(mockUser);

      const res = await service.getUserByEmail('some-email');

      expect(res).toEqual(mockUser);
      expect(mockGetByEmail).toHaveBeenCalledWith('some-email');
    });
  });

  describe('getUserByEmails', () => {
    it('should get users by emails', async () => {
      mockGetByEmails.mockResolvedValue([mockUser]);

      const res = await service.getUsersByEmails(['mock-id']);

      expect(res).toEqual([mockUser]);
      expect(mockGetByEmails).toHaveBeenCalledWith(['mock-id']);
    });
  });

  describe('login', () => {
    it('should log user in', async () => {
      mockLogin.mockResolvedValue(mockUser);

      const res = await service.login({ ...mockUser });

      expect(res).toEqual(mockUser);
      expect(mockLogin).toHaveBeenCalledWith({ ...mockUser });
    });
  });
});
