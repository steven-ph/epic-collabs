import { makePositionRepository, IPositionRepository } from '../position';

const mockLoad = jest.fn();
const mockLoadMany = jest.fn();
jest.mock('dataloader', () =>
  jest.fn(() => ({
    load: mockLoad,
    loadMany: mockLoadMany
  }))
);

const mockPosition = {
  id: 'cat-id',
  name: 'Cat name',
  createdBy: 'blah',
  createdAt: 12345,
  updatedAt: 12345
};

const mockCreate = jest.fn();
const mockFind = jest.fn().mockReturnThis();

const mockPositionDb = {
  create: mockCreate,
  find: jest.fn().mockReturnThis(),
  lean: mockFind
};

describe('PositionRepository', () => {
  let positionRepo: IPositionRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    positionRepo = makePositionRepository({ positionDb: mockPositionDb });
  });

  describe('#createPosition', () => {
    it('should create a position in the db', async () => {
      mockCreate.mockResolvedValue(mockPosition);

      const res = await positionRepo.createPosition({ name: 'Pos name', createdBy: 'blah' });

      expect(res).toEqual(mockPosition);
      expect(mockCreate).toHaveBeenCalledWith({ name: 'Pos name', createdBy: 'blah' });
    });

    it('should not create a position in the db if createdBy is missing', () => {
      return expect(() => positionRepo.createPosition({ name: 'Pos name' })).toThrow('createPosition error:"createdBy" is required');
    });

    it('should not create a position in the db if position name is missing', () => {
      return expect(() => positionRepo.createPosition({ createdBy: 'blah' })).toThrow('createPosition error:"name" is required');
    });
  });

  describe('#getPositionById', () => {
    it('should get position by id', async () => {
      mockLoad.mockResolvedValue(mockPosition);

      const response = await positionRepo.getPositionById('cat-id');

      expect(response).toEqual(mockPosition);
    });
  });

  describe('#getPositionByIds', () => {
    it('should get multiple positions by ids', async () => {
      mockLoadMany.mockResolvedValue([mockPosition]);

      const response = await positionRepo.getPositionByIds(['cat-id']);

      expect(response).toEqual([mockPosition]);
    });
  });

  describe('#getAllPosition', () => {
    it('should get all', async () => {
      mockFind.mockResolvedValue([mockPosition]);

      const response = await positionRepo.getAllPosition();

      expect(response).toEqual([mockPosition]);
    });
  });
});
