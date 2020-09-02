import React, { memo } from 'react';
import { rgba } from 'polished';
import { ReactSVG } from 'react-svg';
import styled, { css } from 'styled-components';
import { colours } from 'styles';
import { Box } from 'components/common';
import { ProgressiveImage } from './ProgressiveImage';
import { makeBuildOptimizedSrc } from './ImageOptimizer';

const ImageComponent = props => {
  const { alt, src, width, height, bgColorMode, roundedMode, isFluid } = props;
  const backgroundColor = rgba(colours.navy300, 0.25);

  if (!src) {
    return null;
  }

  const type = src.split('.').pop();

  const transformations = {
    width: width || null,
    height: height || null
  };

  const sxProps = {
    width: isFluid ? '100%' : width,
    height: isFluid ? 'auto' : height,
    maxWidth: isFluid ? width : 'inherit'
  };

  if (type === 'svg') {
    return (
      <Box
        sx={{
          ...sxProps
        }}
      >
        <ReactSVG src={src} />
      </Box>
    );
  }

  const imgSrc = makeBuildOptimizedSrc(transformations)(src);

  return (
    <ProgressiveImage
      src={imgSrc}
      preload={() => (
        <Container
          roundedMode={roundedMode}
          sx={{
            ...sxProps,
            backgroundColor: bgColorMode ? backgroundColor : 'transparent'
          }}
        />
      )}
    >
      <Container
        roundedMode={roundedMode}
        sx={{
          ...sxProps,
          backgroundColor: bgColorMode ? backgroundColor : 'transparent'
        }}
      >
        <Img src={imgSrc} alt={alt || ''} />
      </Container>
    </ProgressiveImage>
  );
};

const Container = styled(Box)`
  ${({ roundedMode }) =>
    roundedMode &&
    css`
      display: inline-block;
      border-radius: 999px;
    `}
`;

const Img = styled.img`
  width: 100%;
  max-width: 100%;
  border-radius: 2px;
`;

const ImageContainer = memo(ImageComponent);

export { ImageContainer };
