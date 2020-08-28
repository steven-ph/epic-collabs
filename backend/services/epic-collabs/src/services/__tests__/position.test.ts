import { makePositionService } from '../position';

const mockGetById = jest.fn();
const mockGetByIds = jest.fn();
const mockGetAll = jest.fn();
const mockAdd = jest.fn();

const mockRepo = {
  getPositionById: mockGetById,
  getPositionByIds: mockGetByIds,
  getAllPosition: mockGetAll,
  addPosition: mockAdd
};

const mockCategory = {
  _id: 'mock-id',
  name: 'some-name',
  createdBy: 'some-user'
};

describe('PositionService', () => {
  const service = makePositionService({ positionRepo: mockRepo });

  describe('getPositionById', () => {
    it('should get position by id', async () => {
      mockGetById.mockResolvedValue(mockCategory);

      const res = await service.getPositionById('mock-id');

      expect(res).toEqual(mockCategory);
      expect(mockGetById).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getPositionByIds', () => {
    it('should get positions by ids', async () => {
      mockGetByIds.mockResolvedValue([mockCategory]);

      const res = await service.getPositionByIds(['mock-id']);

      expect(res).toEqual([mockCategory]);
      expect(mockGetByIds).toHaveBeenCalledWith(['mock-id']);
    });
  });

  describe('getAllPosition', () => {
    it('should get all positions', async () => {
      mockGetAll.mockResolvedValue([mockCategory]);

      const res = await service.getAllPosition();

      expect(res).toEqual([mockCategory]);
      expect(mockGetAll).toHaveBeenCalled();
    });
  });

  describe('addPosition', () => {
    it('should add a position', async () => {
      mockAdd.mockResolvedValue(mockCategory);

      const res = await service.addPosition({ name: 'some-name', createdBy: 'some-user' });

      expect(res).toEqual(mockCategory);
      expect(mockAdd).toHaveBeenCalledWith({ name: 'some-name', createdBy: 'some-user' });
    });
  });
});
