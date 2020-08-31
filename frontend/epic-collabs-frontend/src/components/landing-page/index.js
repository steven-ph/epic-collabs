import React from 'react';
import { values } from 'lodash';
import { useGetProjects } from 'hooks/use-project';
import { ParallaxPage } from './Parallax';

const LandingPage = () => {
  const { projects } = useGetProjects();
  console.log(values(projects).length);

  return <ParallaxPage />;
};

export { LandingPage };
