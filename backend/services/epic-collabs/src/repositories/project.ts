import Dataloader from 'dataloader';
import { get, isEmpty, isEqual, memoize, omit } from 'lodash';
import { logger } from '@sp-tools/kloud-logger';
import { makeLoader, mongoFindMany } from '../utils/dataloader';
import { IProjectModel, newProjectValidationSchema, updateProjectValidationSchema } from '../models/project';

interface IProjectRepository {
  getProjectById: (id: string) => Promise<IProjectModel>;
  getProjectsByIds: (ids: string[]) => Promise<IProjectModel[]>;
  getProjectsByUserId: (id: string) => Promise<IProjectModel[]>;
  getProjectsByCategoryId: (id: string) => Promise<IProjectModel[]>;
  getProjectsByPositionId: (id: string) => Promise<IProjectModel[]>;
  getAllProjects: () => Promise<IProjectModel[]>;
  createProject: (input: IProjectModel) => Promise<IProjectModel>;
  updateProject: (input: IProjectModel) => Promise<IProjectModel>;
}

const makeProjectRepository = ({ projectDb }): IProjectRepository => {
  const projectByIdLoader = new Dataloader((ids: string[]) => makeLoader({ db: projectDb, key: '_id', ids }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const invalidateCache = id => projectByIdLoader.clear(id);

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

  const createProject = (input: IProjectModel) => {
    const validated = newProjectValidationSchema.validate(input);

    if (validated.error) {
      logger.error('createProject error', validated.error, { input });

      throw new Error('createProject error: ' + validated.error.message);
    }

    return projectDb.create(input);
  };

  const updateProject = async (input: IProjectModel) => {
    const validated = updateProjectValidationSchema.validate(input);

    if (validated.error) {
      logger.error('updateProject error', validated.error, { input });

      throw new Error('updateProject error:' + validated.error.message);
    }

    const _id = get(input, '_id');

    const existingProject = await getProjectById(_id);

    if (isEmpty(existingProject)) {
      const errMsg = 'updateProject error: project not found';
      logger.error(errMsg, null, { input });

      throw new Error(errMsg);
    }

    const updatedBy = get(input, 'updatedBy');
    const createdBy = get(existingProject, 'createdBy');

    if (!isEqual(updatedBy, createdBy)) {
      const errMsg = 'updateProject error: user is not the project owner';
      logger.error(errMsg, null, { input });

      throw new Error(errMsg);
    }

    const options = { new: true, upsert: true, omitUndefined: true };

    invalidateCache(_id);

    return projectDb.findOneAndUpdate({ _id }, omit(input, 'updatedBy'), options);
  };

  return {
    getProjectById,
    getProjectsByIds,
    getProjectsByUserId,
    getProjectsByCategoryId,
    getProjectsByPositionId,
    getAllProjects,
    createProject,
    updateProject
  };
};

export { makeProjectRepository, IProjectRepository, IProjectModel };
