import React from 'react';
import { Skeleton as _Skeleton } from 'antd';
import styled from 'styled-components';

import { useTheme } from 'hooks/use-theme';

const Skeleton = props => {
  const { fontSizes, other } = useTheme();

  const StyledSkeleton = styled(_Skeleton)`
    opacity: ${props => (props.bgChroma === 'dark' ? 0.2 : 1)};

    .ant-skeleton-paragraph li,
    .ant-skeleton-title {
      border-radius: ${other.skeletonBorderRadius};
      height: ${fontSizes.rg};
      margin-top: 12px;
    }
  `;

  return <StyledSkeleton {...props} />;
};

Skeleton.propTypes = {
  ..._Skeleton.propTypes
};

export { Skeleton };
