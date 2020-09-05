import styled from 'styled-components';
import { breakpoints } from 'styles';
import { Box, Loading } from 'components/common';
import { useGetProjectBySlug } from 'hooks/use-project';

const Project = ({ slug }) => {
  const { loading, project } = useGetProjectBySlug({ slug });

  if (loading) {
    return <Loading />;
  }

  return <Container>{project.name}</Container>;
};

const Container = styled(Box)`
  padding-top: 80px;

  @media (max-width: ${breakpoints.sm}) {
    padding-top: 22px;
  }
`;

export { Project };
