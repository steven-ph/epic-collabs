import Dataloader from 'dataloader';
import { get, isEmpty } from 'lodash';
import { IPositionModel } from '../models/position';
import { makeLoader } from '../utils/dataloader';

interface IPositionRepository {
  getPositionById: (id: string) => Promise<IPositionModel | null>;
  getPositionByIds: (ids: string[]) => Promise<IPositionModel[] | null>;
  getAllPosition: () => Promise<IPositionModel[] | null>;
  addPosition: (input: IPositionModel) => Promise<IPositionModel | null>;
}

const makePositionRepository = ({ positionDb }): IPositionRepository => {
  const positionByIdLoader = new Dataloader((ids: string[]) => makeLoader({ db: positionDb, key: '_id', ids }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const getPositionById = async id => positionByIdLoader.load(id);

  const getPositionByIds = async ids => positionByIdLoader.loadMany(ids);

  const getAllPosition = async () => positionDb.find();

  const addPosition = (input: IPositionModel) => {
    const name = get(input, 'name');
    const createdBy = get(input, 'createdBy');

    if (isEmpty(name) || isEmpty(createdBy)) {
      return null;
    }

    return positionDb.create(input);
  };

  return {
    getPositionById,
    getPositionByIds,
    getAllPosition,
    addPosition
  };
};

export { makePositionRepository, IPositionRepository, IPositionModel };
