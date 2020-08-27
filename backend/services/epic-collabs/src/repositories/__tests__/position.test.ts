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
const mockExec = jest.fn();

const mockPositionDb = {
  create: mockCreate,
  find: mockFind,
  where: jest.fn().mockReturnThis(),
  in: jest.fn().mockReturnThis(),
  exec: mockExec
};

describe('PositionRepository', () => {
  let positionRepo: IPositionRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    positionRepo = makePositionRepository({ positionDb: mockPositionDb });
  });

  describe('#addPosition', () => {
    it('should create a position in the db', async () => {
      mockCreate.mockResolvedValue(mockPosition);

      const res = await positionRepo.addPosition({ name: 'Pos name', createdBy: 'blah' });

      expect(res).toEqual(mockPosition);
      expect(mockCreate).toHaveBeenCalledWith({ name: 'Pos name', createdBy: 'blah' });
    });

    it('should not create a position in the db if createdBy is missing', async () => {
      // @ts-ignore
      const result = await positionRepo.addPosition({ name: 'Pos name' });

      expect(result).toEqual(null);
      expect(mockFind).not.toHaveBeenCalled();
      expect(mockCreate).not.toHaveBeenCalled();
    });

    it('should not create a position in the db if position name is missing', async () => {
      // @ts-ignore
      const result = await positionRepo.addPosition({ createdBy: 'blah' });

      expect(result).toEqual(null);
      expect(mockFind).not.toHaveBeenCalled();
      expect(mockCreate).not.toHaveBeenCalled();
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
