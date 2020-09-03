import { logger } from '@sp-tools/kloud-logger';
import { get, isEmpty, kebabCase, values } from 'lodash';
import { generate } from 'shortid';
import { IProjectModel, newProjectValidationSchema, updateProjectValidationSchema } from '../models/project';
import { IProjectRepository } from '../repositories/project';
import { getRandomImage } from '../utils/random-image';

interface IProjectService {
  getProjectById: (id: string) => Promise<IProjectModel>;
  getProjectBySlug: (id: string) => Promise<IProjectModel>;
  getProjectsByIds: (ids: string[]) => Promise<IProjectModel[]>;
  getProjectsByUserId: (id: string) => Promise<IProjectModel[]>;
  getProjectsByCategoryId: (id: string) => Promise<IProjectModel[]>;
  getProjectsByPositionId: (id: string) => Promise<IProjectModel[]>;
  getProjects: () => Promise<IProjectModel[]>;
  createProject: (input: IProjectModel) => Promise<IProjectModel>;
  updateProject: (input: IProjectModel) => Promise<IProjectModel>;
}

interface IProjectServiceDI {
  projectRepo: IProjectRepository;
}

const makeProjectService = ({ projectRepo }: IProjectServiceDI): IProjectService => {
  const getProjectById = id => projectRepo.getProjectById(id);
  const getProjectBySlug = slug => projectRepo.getProjectBySlug(slug);
  const getProjectsByIds = ids => projectRepo.getProjectsByIds(ids);
  const getProjectsByUserId = id => projectRepo.getProjectsByUserId(id);
  const getProjectsByCategoryId = id => projectRepo.getProjectsByCategoryId(id);
  const getProjectsByPositionId = id => projectRepo.getProjectsByPositionId(id);
  const getProjects = () => projectRepo.getProjects();

  const createProject = async (input: IProjectModel) => {
    const validated = newProjectValidationSchema.validate(input);

    if (validated.error) {
      logger.error('createProject error', { error: validated.error.message }, { input });

      throw new Error('createProject error: ' + validated.error.message);
    }

    const { name } = input;

    const slug = `${kebabCase(name)}-${generate()}-${generate()}`.toLowerCase();
    const [image, coverImage] = await Promise.all([getRandomImage({ width: 300, height: 300 }), getRandomImage({ width: 1280, height: 300 })]);

    return projectRepo.createProject({ ...input, slug, image, coverImage });
  };

  const updateProject = async (input: IProjectModel) => {
    const validated = updateProjectValidationSchema.validate(input);

    if (validated.error) {
      logger.error('updateProject error', { error: validated.error.message }, { input });

      throw new Error('updateProject error:' + validated.error.message);
    }

    const _id = get(input, '_id');

    const existingProject = await projectRepo.getProjectById(_id);

    if (isEmpty(existingProject)) {
      const errMsg = 'updateProject error: project not found';
      logger.error(errMsg, null, { input });

      throw new Error(errMsg);
    }

    const updatedBy = get(input, 'updatedBy');
    const createdBy = get(existingProject, 'createdBy');
    const collaborators = values(get(existingProject, 'collaborators'));
    const collabIds = [createdBy, ...collaborators.map(c => c.userId)].filter(Boolean);

    if (!collabIds.includes(updatedBy) && !input.isInternalUpdate) {
      const errMsg = 'updateProject error: user is not the project owner or collaborator';
      logger.error(errMsg, null, { input });

      throw new Error(errMsg);
    }

    if (input.createdBy && input.createdBy !== createdBy && updatedBy !== createdBy) {
      const errMsg = 'updateProject error: user is not the project owner';
      logger.error(errMsg, null, { input });

      throw new Error(errMsg);
    }

    return projectRepo.updateProject(input);
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

export { makeProjectService, IProjectService, IProjectModel };
