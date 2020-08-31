import { values } from 'lodash';
import { useGetProjects } from 'hooks/use-project';

const Projects = () => {
  const { projects } = useGetProjects();
  console.log(values(projects).length);

  return <div>PROJECTS</div>;
};

export { Projects };
