import { IPositionRepository, IPositionModel } from '../repositories/position';

interface IPositionService {
  getPositionById: (id: string) => Promise<IPositionModel | null>;
  getPositionByIds: (ids: string[]) => Promise<IPositionModel[] | null>;
  getAllPosition: () => Promise<IPositionModel[] | null>;
  addPosition: (input: IPositionModel) => Promise<IPositionModel | null>;
}

interface IPositionServiceDI {
  positionRepo: IPositionRepository;
}

const makePositionService = ({ positionRepo }: IPositionServiceDI): IPositionService => {
  const getPositionById = id => positionRepo.getPositionById(id);
  const getPositionByIds = ids => positionRepo.getPositionByIds(ids);
  const getAllPosition = () => positionRepo.getAllPosition();
  const addPosition = (input: IPositionModel) => positionRepo.addPosition(input);

  return {
    getPositionById,
    getPositionByIds,
    getAllPosition,
    addPosition
  };
};

export { makePositionService, IPositionService, IPositionModel };
