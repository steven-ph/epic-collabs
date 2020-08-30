import { makePositionService } from '../position';

const mockRepo = {
  getPositionById: jest.fn(),
  getPositionByIds: jest.fn(),
  getPositions: jest.fn(),
  createPosition: jest.fn()
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
      mockRepo.getPositionById.mockResolvedValue(mockCategory);

      const res = await service.getPositionById('mock-id');

      expect(res).toEqual(mockCategory);
      expect(mockRepo.getPositionById).toHaveBeenCalledWith('mock-id');
    });
  });

  describe('getPositionByIds', () => {
    it('should get positions by ids', async () => {
      mockRepo.getPositionByIds.mockResolvedValue([mockCategory]);

      const res = await service.getPositionByIds(['mock-id']);

      expect(res).toEqual([mockCategory]);
      expect(mockRepo.getPositionByIds).toHaveBeenCalledWith(['mock-id']);
    });
  });

  describe('getPositions', () => {
    it('should get positions', async () => {
      mockRepo.getPositions.mockResolvedValue([mockCategory]);

      const res = await service.getPositions();

      expect(res).toEqual([mockCategory]);
      expect(mockRepo.getPositions).toHaveBeenCalled();
    });
  });

  describe('createPosition', () => {
    it('should add a position', async () => {
      mockRepo.createPosition.mockResolvedValue(mockCategory);

      const res = await service.createPosition({ name: 'some-name', createdBy: 'some-user' });

      expect(res).toEqual(mockCategory);
      expect(mockRepo.createPosition).toHaveBeenCalledWith({ name: 'some-name', createdBy: 'some-user' });
    });
  });
});
