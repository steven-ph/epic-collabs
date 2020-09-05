import React from 'react';
import styled from 'styled-components';
import { breakpoints, colors, defaultTheme } from 'styles';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/common';

const { fontSizes, fontWeights } = defaultTheme;

const StyledEditButton = styled(Button)`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.medium};
  color: ${colors.blue700};
  min-width: 70px;

  @media only screen and (min-width: 0px) and (max-width: ${breakpoints.md}) and (orientation: portrait) {
    min-width: 20px;
  }

  @media screen and (max-width: ${breakpoints.xs}) {
    span {
      display: none;
    }
  }
`;

const PenIcon = styled(FontAwesomeIcon)`
  font-size: ${fontSizes.sm};
  color: ${colors.blue700};

  @media (min-width: 0px) and (max-width: ${breakpoints.md}) and (orientation: portrait) {
    font-size: ${fontSizes.l};
  }
`;

const EditButton = ({ onClick, ...rest }) => {
  return (
    <StyledEditButton type="link" onClick={onClick} {...rest}>
      <PenIcon icon={faPen} />
      <span sx={{ marginLeft: '5px' }}>Edit</span>
    </StyledEditButton>
  );
};

export { EditButton };
