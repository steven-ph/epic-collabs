import Dataloader from 'dataloader';
import { memoize } from 'lodash';
import { logger } from '@sp-tools/kloud-logger';
import { makeLoader } from '../utils/dataloader';
import { IPositionModel, newPositionValidationSchema } from '../models/position';

interface IPositionRepository {
  getPositionById: (id: string) => Promise<IPositionModel>;
  getPositionByIds: (ids: string[]) => Promise<IPositionModel[]>;
  getPositions: () => Promise<IPositionModel[]>;
  createPosition: (input: IPositionModel) => Promise<IPositionModel>;
}

const makePositionRepository = ({ positionDb }): IPositionRepository => {
  const positionByIdLoader = new Dataloader((ids: string[]) => makeLoader({ db: positionDb, key: '_id', ids }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const getPositionById = async id => {
    if (!id) {
      return null;
    }

    return positionByIdLoader.load(id);
  };

  const getPositionByIds = async ids => {
    if (!ids) {
      return null;
    }

    return positionByIdLoader.loadMany(ids);
  };

  const getPositions = memoize(async () => positionDb.find().lean());

  const createPosition = (input: IPositionModel) => {
    const validated = newPositionValidationSchema.validate(input);

    if (validated.error) {
      logger.error('createPosition error', { error: validated.error.message }, { input });

      throw new Error('createPosition error:' + validated.error.message);
    }

    return positionDb.create(input);
  };

  return {
    getPositionById,
    getPositionByIds,
    getPositions,
    createPosition
  };
};

export { makePositionRepository, IPositionRepository, IPositionModel };
