import { Tooltip } from 'antd';
import { Box, Flexbox, Icon, ImageContainer } from 'components/common';
import { useGetProjects } from 'hooks/use-project';
import { get, shuffle, values } from 'lodash';
import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { breakpoints, colours, easing } from 'styles';

const Project = ({ project }) => {
  const followersCount = values(get(project, 'followers')).length;
  const positionAvailable = values(get(project, 'collaborators')).filter(c => !get(c, 'user._id')).length;

  return (
    <Item className="overlay-hover">
      <ImageBox>
        <ImageContainer isFluid src={project.image} alt={project.name} />
      </ImageBox>
      <Flexbox mt="8px" pl="4px" pr="4px" alignItems="center">
        <Icon name="project" width={22} />
        <Name>{project.name}</Name>

        {positionAvailable >= 1 && (
          <>
            <Tooltip title={`Available ${positionAvailable > 1 ? 'positions' : 'position'}`}>
              <Icon name="opportunity" width={22} />
            </Tooltip>
            <Count>{positionAvailable}</Count>
          </>
        )}
        <Tooltip title="Followers">
          <Icon name="heart" width={22} />
        </Tooltip>
        <Count>{followersCount}</Count>
      </Flexbox>
      <Overlay className="overlay">
        <Flexbox>
          <Tooltip title="Follow this project">
            <IconContainer>
              <Icon name="follow" width={52} mr="8px" sx={{ cursor: 'pointer' }} />
            </IconContainer>
          </Tooltip>
          <Tooltip title="Join this project">
            <IconContainer>
              <Icon name="join" width={44} ml="8px" sx={{ cursor: 'pointer' }} />
            </IconContainer>
          </Tooltip>
        </Flexbox>
      </Overlay>
    </Item>
  );
};

const Projects = () => {
  const { projects } = useGetProjects();
  const data = shuffle(values(projects));
  const items = shuffle([...data, ...data, ...data]);

  return (
    <Container>
      {items.map((project, index) => (
        <Project key={index} project={project} />
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

  transition: all 0.3s ${easing.default};

  :hover {
    transform: scale(1.05);
  }

  &.overlay-hover .overlay {
    svg {
      opacity: 0;
    }

    &:hover {
      background-image: linear-gradient(to bottom, transparent 0%, ${rgba(colours.navy900, 0.25)} 100%);

      svg {
        opacity: 1;

        &:hover {
          transform: scale(1.05);
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
  color: ${colours.navy900};
  flex: 1;
`;

const Count = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  margin-left: 4px;
  margin-right: 8px;
  color: ${colours.navy600};
`;

const Overlay = styled(Flexbox)`
  position: absolute;
  align-items: flex-end;
  justify-content: center;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 35px;
  border-radius: 8px;
  padding-bottom: 20px;
`;

const ImageBox = styled(Box)`
  border-radius: 8px;
  will-change: transform;
  transition: box-shadow 0.3s;
  border: 5px solid ${colours.white};
  box-shadow: 0px 5px 5px -5px ${colours.shadeDark};

  img {
    border-radius: 8px;
  }
`;

const IconContainer = styled(Flexbox)`
  pointer-events: auto;

  svg {
    filter: drop-shadow(3px 3px 2px ${colours.shadeDark});
  }
`;

export { Projects };
