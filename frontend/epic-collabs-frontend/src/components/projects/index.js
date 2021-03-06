import React from 'react';
import { Tooltip } from 'antd';
import { rgba } from 'polished';
import styled from 'styled-components';
import { get, values } from 'lodash';
import { useAuthContext } from 'context/auth';
import { useGetProjects } from 'hooks/use-project';
import { breakpoints, colors, easing } from 'styles';
import { createLoginUrl } from 'functions/create-login-url';
import { Box, Flexbox, Icon, ImageContainer, Link, Loading } from 'components/common';

const Project = ({ project, isLoggedIn }) => {
  const followersCount = values(get(project, 'followers')).length;
  const positionAvailable = values(get(project, 'collaborators')).filter(c => !get(c, 'user._id')).length;

  return (
    <Item className="overlay-hover">
      <ImageBox>
        <ImageContainer isFluid src={project.image} alt={project.name} />
      </ImageBox>
      <Flexbox mt="8px" pl="4px" pr="4px" alignItems="center">
        <Icon name="project" width="22px" />
        <Name>
          <Link href={`/project/[slug]?slug=${project.slug}`} as={`/project/${project.slug}`}>
            {project.name}
          </Link>
        </Name>
        {positionAvailable >= 1 && (
          <>
            <Tooltip title={`Available ${positionAvailable > 1 ? 'positions' : 'position'}`}>
              <Icon name="opportunity" width="22px" />
            </Tooltip>
            <Count>{positionAvailable}</Count>
          </>
        )}
        <Tooltip title="Followers">
          <Icon name="heart" width="22px" />
        </Tooltip>
        <Count>{followersCount}</Count>
      </Flexbox>
      <Overlay className="overlay">
        <Flexbox>
          <Tooltip title="Follow this project">
            <IconContainer>
              {isLoggedIn ? (
                <Link href={`/project/[slug]?slug=${project.slug}`} as={`/project/${project.slug}`}>
                  <Icon name="follow" width={52} mr="8px" sx={{ cursor: 'pointer' }} />
                </Link>
              ) : (
                <a href={createLoginUrl({ redirectTo: `/project/${project.slug}` })}>
                  <Icon name="follow" width={52} mr="8px" sx={{ cursor: 'pointer' }} />
                </a>
              )}
            </IconContainer>
          </Tooltip>
          <Tooltip title="Join this project">
            <IconContainer>
              {isLoggedIn ? (
                <Link href={`/project/[slug]?slug=${project.slug}`} as={`/project/${project.slug}`}>
                  <Icon name="join" width={40} ml="8px" sx={{ cursor: 'pointer' }} />
                </Link>
              ) : (
                <a href={createLoginUrl({ redirectTo: `/project/${project.slug}` })}>
                  <Icon name="join" width={40} ml="8px" sx={{ cursor: 'pointer' }} />
                </a>
              )}
            </IconContainer>
          </Tooltip>
        </Flexbox>
      </Overlay>
    </Item>
  );
};

const Projects = () => {
  const { user } = useAuthContext();
  const { loading, projects } = useGetProjects();

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      {projects.map((project, index) => (
        <Project key={index} project={project} isLoggedIn={!!user} />
      ))}
    </Container>
  );
};

const Container = styled(Box)`
  display: grid;
  grid-gap: 24px;
  transition: all 0.25s ${easing.default};

  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

  @media (min-width: ${breakpoints.xxl}) {
    grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));
  }
`;

const Item = styled(Flexbox)`
  position: relative;
  flex-direction: column;
  flex: 1 1 316px;
  max-width: 480px;
  margin: calc(24px / 2);
  overflow: hidden;
  transition: all 0.25s ${easing.default};

  :hover {
    transform: scale(1.05);
  }

  &.overlay-hover .overlay {
    svg {
      opacity: 0;
    }

    &:hover {
      background-image: linear-gradient(to bottom, transparent 0%, ${rgba(colors.navy900, 0.25)} 100%);

      svg {
        opacity: 1;

        &:hover {
          transform: scale(1.05);
          transition: all 0.25s ${easing.default};
        }
      }
    }
  }
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 8px;

  flex: 1;

  a {
    color: ${colors.navy900};

    &:hover,
    &:focus {
      cursor: pointer;
      text-decoration: none;
      color: ${colors.navy500};
    }
  }
`;

const Count = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  margin-left: 4px;
  margin-right: 8px;
  color: ${colors.navy600};
  user-select: none;
`;

const Overlay = styled(Flexbox)`
  position: absolute;
  align-items: flex-end;
  justify-content: center;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 33px;
  border-radius: 8px;
  padding-bottom: 20px;
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

const IconContainer = styled(Flexbox)`
  pointer-events: auto;

  svg {
    filter: drop-shadow(3px 3px 2px ${colors.shadeDark});
  }
`;

export { Projects };
