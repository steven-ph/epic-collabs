import { get } from 'lodash';
import { makeUserContext, IUserService } from './context/user';
import { makeCategoryContext, ICategoryService } from './context/category';
import { makePositionContext, IPositionService } from './context/position';
import { makeProjectContext, IProjectService } from './context/project';

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
  const viewer = getViewer({ event });
  const Category = makeCategoryContext({ categoryDb: dbConnection.models.Category });
  const Position = makePositionContext({ positionDb: dbConnection.models.Position });
  const Project = makeProjectContext({ projectDb: dbConnection.models.Project });
  const User = makeUserContext({ userDb: dbConnection.models.User, projectService: Project });

  return {
    viewer,
    User,
    Category,
    Position,
    Project
  };
};

export { makeContext, IContext };
