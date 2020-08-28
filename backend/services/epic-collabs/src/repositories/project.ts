import Dataloader from 'dataloader';
import { get, isEmpty } from 'lodash';
import { IProjectModel } from '../models/project';
import { makeLoader } from '../utils/dataloader';

interface IProjectRepository {
  getProjectById: (id: string) => Promise<IProjectModel | null>;
  getProjectsByIds: (ids: string[]) => Promise<IProjectModel[] | null>;
  getAllProjects: () => Promise<IProjectModel[] | null>;
  addProject: (input: IProjectModel) => Promise<IProjectModel | null>;
}

const makeProjectRepository = ({ projectDb }): IProjectRepository => {
  const projectByIdLoader = new Dataloader((ids: string[]) => makeLoader({ db: projectDb, key: '_id', ids }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const getProjectById = async id => projectByIdLoader.load(id);

  const getProjectsByIds = async ids => projectByIdLoader.loadMany(ids);

  const getAllProjects = async () => projectDb.find();

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
    getAllProjects,
    addProject
  };
};

export { makeProjectRepository, IProjectRepository, IProjectModel };
