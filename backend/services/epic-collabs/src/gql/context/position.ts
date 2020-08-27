import { makePositionRepository } from '../../repositories/position';
import { makePositionService, IPositionService } from '../../services/position';

const makePositionContext = ({ positionDb }): IPositionService => {
  const positionRepo = makePositionRepository({ positionDb });

  return makePositionService({ positionRepo });
};

export { makePositionContext, IPositionService };
