import { get } from 'lodash';
import { makeUserContext, IUserService } from './context/user';
import { makeCategoryContext, ICategoryService } from './context/category';
import { makePositionContext, IPositionService } from './context/position';
import { makeProjectContext, IProjectService } from './context/Project';

interface IViewer {
  id: string;
}

interface IContext {
  viewer: IViewer;
  User: IUserService;
  Category: ICategoryService;
  Position: IPositionService;
  Project: IProjectService;
}

const getViewer = ({ event }) => {
  const authorizer = get(event, 'requestContext.authorizer') || {};
  return {
    id: get(authorizer, 'principalId')
  };
};

const makeContext = ({ event, dbConnection }): IContext => {
  return {
    viewer: getViewer({ event }),
    User: makeUserContext({ userDb: dbConnection.models.User }),
    Category: makeCategoryContext({ categoryDb: dbConnection.models.Category }),
    Position: makePositionContext({ positionDb: dbConnection.models.Position }),
    Project: makeProjectContext({ projectDb: dbConnection.models.Project })
  };
};

export { makeContext, IContext };
