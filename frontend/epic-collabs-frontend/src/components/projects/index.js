import React from 'react';
import { values } from 'lodash';
import styled from 'styled-components';
import { easing } from 'styles';
import { useGetProjects } from 'hooks/use-project';
import { Flexbox } from 'components/common';

const Project = ({ project }) => {
  return (
    <Item>
      <img src={project.image} alt={project.name} />
    </Item>
  );
};

const Projects = () => {
  const { projects } = useGetProjects();
  const data = values(projects);
  const items = [
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data
  ];

  return (
    <Container>
      {items.map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </Container>
  );
};

const Container = styled(Flexbox)`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Item = styled(Flexbox)`
  margin: 4px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  will-change: transform;
  border: 5px solid white;

  transition: 0.15s opacity ${easing.default};

  img {
    border-radius: 5px;
  }
`;

export { Projects };
