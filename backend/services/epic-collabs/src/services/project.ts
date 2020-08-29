import { IProjectRepository, IProjectModel, IChangeProjectOwnershipInput } from '../repositories/project';

interface IProjectService {
  getProjectById: (id: string) => Promise<IProjectModel>;
  getProjectsByIds: (ids: string[]) => Promise<IProjectModel[]>;
  getProjectsByUserId: (id: string) => Promise<IProjectModel[]>;
  getProjectsByCategoryId: (id: string) => Promise<IProjectModel[]>;
  getProjectsByPositionId: (id: string) => Promise<IProjectModel[]>;
  getAllProjects: () => Promise<IProjectModel[]>;
  createProject: (input: IProjectModel) => Promise<IProjectModel>;
  updateProject: (input: IProjectModel) => Promise<IProjectModel>;
  changeProjectOwnership: (input: IChangeProjectOwnershipInput) => Promise<IProjectModel>;
}

interface IProjectServiceDI {
  projectRepo: IProjectRepository;
}

const makeProjectService = ({ projectRepo }: IProjectServiceDI): IProjectService => {
  const getProjectById = id => projectRepo.getProjectById(id);
  const getProjectsByIds = ids => projectRepo.getProjectsByIds(ids);
  const getProjectsByUserId = id => projectRepo.getProjectsByUserId(id);
  const getProjectsByCategoryId = id => projectRepo.getProjectsByCategoryId(id);
  const getProjectsByPositionId = id => projectRepo.getProjectsByPositionId(id);
  const getAllProjects = () => projectRepo.getAllProjects();
  const createProject = (input: IProjectModel) => projectRepo.createProject(input);
  const updateProject = (input: IProjectModel) => projectRepo.updateProject(input);
  const changeProjectOwnership = (input: IChangeProjectOwnershipInput) => projectRepo.changeProjectOwnership(input);

  return {
    getProjectById,
    getProjectsByIds,
    getProjectsByUserId,
    getProjectsByCategoryId,
    getProjectsByPositionId,
    getAllProjects,
    createProject,
    updateProject,
    changeProjectOwnership
  };
};

export { makeProjectService, IProjectService, IProjectModel };
