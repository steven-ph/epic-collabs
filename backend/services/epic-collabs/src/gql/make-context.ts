import { get } from 'lodash';
import { makeUserContext, IUserService } from './context/user';
import { makeCategoryContext, ICategoryService } from './context/category';

interface IViewer {
  id: string;
}

interface IContext {
  viewer: IViewer;
  User: IUserService;
  Category: ICategoryService;
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
    Category: makeCategoryContext({ categoryDb: dbConnection.models.Category })
  };
};

export { makeContext, IContext };
