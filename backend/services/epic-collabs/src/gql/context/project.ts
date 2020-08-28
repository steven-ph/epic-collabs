import { makeProjectRepository } from '../../repositories/project';
import { makeProjectService, IProjectService } from '../../services/project';

const makeProjectContext = ({ projectDb }): IProjectService => {
  const projectRepo = makeProjectRepository({ projectDb });

  return makeProjectService({ projectRepo });
};

export { makeProjectContext, IProjectService };
