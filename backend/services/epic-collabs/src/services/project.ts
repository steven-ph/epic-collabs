import { IProjectRepository, IProjectModel } from '../repositories/project';

interface IProjectService {
  getProjectById: (id: string) => Promise<IProjectModel | null>;
  getProjectsByIds: (ids: string[]) => Promise<IProjectModel[] | null>;
  getProjectsByUserId: (id: string) => Promise<IProjectModel[] | null>;
  getProjectsByCategoryId: (id: string) => Promise<IProjectModel[] | null>;
  getProjectsByPositionId: (id: string) => Promise<IProjectModel[] | null>;
  getAllProjects: () => Promise<IProjectModel[] | null>;
  addProject: (input: IProjectModel) => Promise<IProjectModel | null>;
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
  const addProject = (input: IProjectModel) => projectRepo.addProject(input);

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

export { makeProjectService, IProjectService, IProjectModel };
