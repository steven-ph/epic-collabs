import { IPositionRepository, IPositionModel } from '../repositories/position';

interface IPositionService {
  getPositionById: (id: string) => Promise<IPositionModel>;
  getPositionByIds: (ids: string[]) => Promise<IPositionModel[]>;
  getPositions: () => Promise<IPositionModel[]>;
  createPosition: (input: IPositionModel) => Promise<IPositionModel>;
}

interface IPositionServiceDI {
  positionRepo: IPositionRepository;
}

const makePositionService = ({ positionRepo }: IPositionServiceDI): IPositionService => {
  const getPositionById = id => positionRepo.getPositionById(id);
  const getPositionByIds = ids => positionRepo.getPositionByIds(ids);
  const getPositions = () => positionRepo.getPositions();
  const createPosition = (input: IPositionModel) => positionRepo.createPosition(input);

  return {
    getPositionById,
    getPositionByIds,
    getPositions,
    createPosition
  };
};

export { makePositionService, IPositionService, IPositionModel };
