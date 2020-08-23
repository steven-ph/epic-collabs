import { get } from 'lodash';
import { makeUserContext, IUserService } from './context/user';

interface IViewer {
  id: string;
}

interface IContext {
  viewer: IViewer;
  User: IUserService;
}

const getViewer = ({ event }) => {
  const authorizer = get(event, 'requestContext.authorizer') || {};
  return {
    id: get(authorizer, 'principalId')
  };
};

const makeContext = ({ event, dbConnection }): IContext => {
  return { viewer: getViewer({ event }), User: makeUserContext({ userDb: dbConnection.models.User }) };
};

export { makeContext, IContext };
