import Dataloader from 'dataloader';
import { get, isEmpty, memoize } from 'lodash';
import { IProjectModel } from '../models/project';
import { makeLoader, mongoFindMany } from '../utils/dataloader';

interface IProjectRepository {
  getProjectById: (id: string) => Promise<IProjectModel | null>;
  getProjectsByIds: (ids: string[]) => Promise<IProjectModel[] | null>;
  getProjectsByUserId: (id: string) => Promise<IProjectModel[] | null>;
  getProjectsByCategoryId: (id: string) => Promise<IProjectModel[] | null>;
  getProjectsByPositionId: (id: string) => Promise<IProjectModel[] | null>;
  getAllProjects: () => Promise<IProjectModel[] | null>;
  addProject: (input: IProjectModel) => Promise<IProjectModel | null>;
}

const makeProjectRepository = ({ projectDb }): IProjectRepository => {
  const projectByIdLoader = new Dataloader((ids: string[]) => makeLoader({ db: projectDb, key: '_id', ids }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const getProjectById = async id => projectByIdLoader.load(`${id}`);

  const getProjectsByIds = async ids => projectByIdLoader.loadMany(ids.map(id => `${id}`));

  const getProjectsByUserId = memoize(
    async id => projectDb.find({ createdBy: id }),
    (...args) => JSON.stringify(args)
  );

  const getProjectsByCategoryId = memoize(
    async id => mongoFindMany({ db: projectDb, key: 'categories', values: [id] }),
    (...args) => JSON.stringify(args)
  );

  const getProjectsByPositionId = memoize(
    async id => projectDb.find({ 'collaborators.positionId': id }),
    (...args) => JSON.stringify(args)
  );

  const getAllProjects = memoize(async () => projectDb.find());

  const addProject = (input: IProjectModel) => {
    const slug = get(input, 'slug');
    const name = get(input, 'name');
    const description = get(input, 'description');
    const categories = get(input, 'categories');
    const createdBy = get(input, 'createdBy');

    if (isEmpty(slug) || isEmpty(name) || isEmpty(description) || isEmpty(categories) || isEmpty(createdBy)) {
      return null;
    }

    return projectDb.create(input);
  };

  return {
    getProjectById,
    getProjectsByIds,
    getProjectsByUserId,
    getProjectsByCategoryId,
    getProjectsByPositionId,
    getAllProjects,
    addProject
  };
};

export { makeProjectRepository, IProjectRepository, IProjectModel };
