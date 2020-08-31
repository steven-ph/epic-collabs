import React from 'react';
import { values } from 'lodash';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { breakpoints, colours, easing } from 'styles';
import { useGetProjects } from 'hooks/use-project';
import { Box, Flexbox } from 'components/common';

const Projects = () => {
  const { projects } = useGetProjects();
  const data = [
    ...values(projects),
    ...values(projects),
    ...values(projects),
    ...values(projects),
    ...values(projects),
    ...values(projects),
    ...values(projects),
    ...values(projects),
    ...values(projects),
    ...values(projects),
    ...values(projects),
    ...values(projects)
  ];

  return (
    <Container>
      {data.map((project, index) => (
        <Item key={index}>
          <img src={project.image} alt={project.name} />
        </Item>
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
  padding: 4px;
  margin: 4px;
  transition: 0.3s opacity ${easing.default};
`;

export { Projects };
