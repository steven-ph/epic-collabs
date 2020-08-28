import { IProjectRepository, IProjectModel } from '../repositories/project';

interface IProjectService {
  getProjectById: (id: string) => Promise<IProjectModel | null>;
  getProjectsByIds: (ids: string[]) => Promise<IProjectModel[] | null>;
  getAllProjects: () => Promise<IProjectModel[] | null>;
  addProject: (input: IProjectModel) => Promise<IProjectModel | null>;
}

interface IProjectServiceDI {
  projectRepo: IProjectRepository;
}

const makeProjectService = ({ projectRepo }: IProjectServiceDI): IProjectService => {
  const getProjectById = id => projectRepo.getProjectById(id);
  const getProjectsByIds = ids => projectRepo.getProjectsByIds(ids);
  const getAllProjects = () => projectRepo.getAllProjects();
  const addProject = (input: IProjectModel) => projectRepo.addProject(input);

  return {
    getProjectById,
    getProjectsByIds,
    getAllProjects,
    addProject
  };
};

export { makeProjectService, IProjectService, IProjectModel };
