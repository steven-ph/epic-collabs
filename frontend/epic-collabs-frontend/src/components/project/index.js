import Head from 'next/head';
import styled from 'styled-components';
import { breakpoints, colors } from 'styles';
import { useGetProjectBySlug } from 'hooks/use-project';
import { Box, Flexbox, ImageContainer, Loading } from 'components/common';

const Project = ({ slug }) => {
  const { loading, project } = useGetProjectBySlug({ slug });
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{`Epic Collabs | ${project.name}`}</title>
      </Head>
      <Container>
        <ImageBox>
          <ImageContainer isFluid src={project.image} alt={project.name} />
        </ImageBox>
      </Container>
    </>
  );
};

const Container = styled(Flexbox)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 80px;

  @media (max-width: ${breakpoints.sm}) {
    padding-top: 22px;
  }
`;

const ImageBox = styled(Box)`
  border-radius: 8px;
  will-change: transform;
  transition: box-shadow 0.3s;
  border: 3px solid ${colors.white};
  box-shadow: 0px 5px 5px -5px ${colors.shadeDark};
  user-select: none;

  img {
    border-radius: 8px;
  }
`;

export { Project };
