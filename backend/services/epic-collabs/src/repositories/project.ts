import Dataloader from 'dataloader';
import { get, memoize, omit } from 'lodash';
import { logger } from '@sp-tools/kloud-logger';
import { makeLoader, findMany } from '../utils/dataloader';
import { IProjectModel, newProjectValidationSchema, updateProjectValidationSchema } from '../models/project';

const updateOptions = { new: true, lean: true, upsert: true, omitUndefined: true };

interface IProjectRepository {
  getProjectById: (id: string) => Promise<IProjectModel>;
  getProjectBySlug: (slug: string) => Promise<IProjectModel>;
  getProjectsByIds: (ids: string[]) => Promise<IProjectModel[]>;
  getProjectsByUserId: (id: string) => Promise<IProjectModel[]>;
  getProjectsByCategoryId: (id: string) => Promise<IProjectModel[]>;
  getProjectsByPositionId: (id: string) => Promise<IProjectModel[]>;
  getProjects: () => Promise<IProjectModel[]>;
  createProject: (input: IProjectModel) => Promise<IProjectModel>;
  updateProject: (input: IProjectModel) => Promise<IProjectModel>;
}

const makeProjectRepository = ({ projectDb }): IProjectRepository => {
  const projectByIdLoader = new Dataloader((ids: string[]) => makeLoader({ db: projectDb, key: '_id', ids }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const projectBySlugLoader = new Dataloader((slugs: string[]) => makeLoader({ db: projectDb, key: 'slug', ids: slugs }), {
    cacheKeyFn: key => JSON.stringify(key)
  });

  const invalidateCache = ({ id, slug }) => {
    if (id) {
      projectByIdLoader.clear(id);
    }

    if (slug) {
      projectBySlugLoader.clear(slug);
    }
  };

  const getProjectBySlug = async slug => {
    if (!slug) {
      return null;
    }

    return projectBySlugLoader.load(slug);
  };

  const getProjectById = async id => {
    if (!id) {
      return null;
    }

    return projectByIdLoader.load(id);
  };

  const getProjectsByIds = async ids => {
    if (!ids) {
      return null;
    }

    return projectByIdLoader.loadMany(ids);
  };

  const getProjectsByUserId = memoize(
    async id => projectDb.find({ createdBy: id }).lean(),
    (...args) => JSON.stringify(args)
  );

  const getProjectsByCategoryId = memoize(
    async id => findMany({ db: projectDb, key: 'categories', values: [id] }),
    (...args) => JSON.stringify(args)
  );

  const getProjectsByPositionId = memoize(
    async id => projectDb.find({ 'collaborators.positionId': id }).lean(),
    (...args) => JSON.stringify(args)
  );

  const getProjects = memoize(async () => projectDb.find().lean());

  const createProject = (input: IProjectModel) => {
    const validated = newProjectValidationSchema.validate(input);

    if (validated.error) {
      logger.error('createProject error', { error: validated.error.message }, { input });

      throw new Error('createProject error: ' + validated.error.message);
    }

    return projectDb.create({ ...input });
  };

  const updateProject = async (input: IProjectModel) => {
    const validated = updateProjectValidationSchema.validate(input);

    if (validated.error) {
      logger.error('updateProject error', { error: validated.error.message }, { input });

      throw new Error('updateProject error:' + validated.error.message);
    }

    const _id = get(input, '_id');
    const slug = get(input, 'slug');

    invalidateCache({ id: _id, slug });

    return projectDb.findOneAndUpdate({ _id }, { ...omit(input, ['updatedBy', 'isInternalUpdate']), updatedAt: Date.now() }, updateOptions);
  };

  return {
    getProjectById,
    getProjectBySlug,
    getProjectsByIds,
    getProjectsByUserId,
    getProjectsByCategoryId,
    getProjectsByPositionId,
    getProjects,
    createProject,
    updateProject
  };
};

export { makeProjectRepository, IProjectRepository, IProjectModel };
