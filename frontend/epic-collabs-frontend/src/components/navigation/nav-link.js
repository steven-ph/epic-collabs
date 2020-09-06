import { Box, Flexbox, Icon, Link } from 'components/common';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { colors, easing } from 'styles';
import { NAV_CONFIGS } from './nav-config';

const NavBottomBorder = () => (
  <Box
    className="nav-bottom-border"
    sx={{
      height: '2px',
      width: '100%',
      maxWidth: 60,
      background: colors.green900,
      boxShadow: `0px 0px 4px ${colors.green900}`
    }}
  />
);

const NavItem = ({ icon, label, isNew }) => (
  <InnerLink>
    <Box
      sx={{
        position: 'relative',
        width: 28,
        height: 28
      }}
    >
      <Icon name={icon} />
      {isNew && <New>New</New>}
    </Box>
    <Box
      sx={{
        fontSize: 'xs',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        mb: 11,
        letterSpacing: '-.02em'
      }}
    >
      {label}
    </Box>
    <NavBottomBorder />
  </InnerLink>
);

const NavLink = ({ item, href, textColor = colors.navy, altColor = colors.navy }) => {
  const { pathname = '' } = useRouter();
  const navProps = NAV_CONFIGS[item];

  return (
    <OuterBox textColor={textColor} altColor={altColor} isCurrentPath={pathname === href}>
      <Link href={href}>
        <NavItem {...navProps} textColor={textColor} altColor={altColor} />
      </Link>
    </OuterBox>
  );
};

// Handle :hover and :focus states
const OuterBox = styled(Box)`
  align-self: flex-end;

  a {
    color: ${({ isCurrentPath, textColor, altColor }) => (isCurrentPath ? altColor : textColor)};
    transition: color 0.1s ${easing.default};
  }

  svg path {
    fill: ${({ isCurrentPath, textColor, altColor }) => (isCurrentPath ? altColor : textColor)};
    transition: fill 0.1s ${easing.default};
  }

  .nav-bottom-border {
    opacity: ${({ isCurrentPath }) => (isCurrentPath ? 1 : 0)};
    transition: opacity 0.1s ${easing.default};
  }

  a:hover,
  a:focus {
    svg path {
      fill: ${({ altColor }) => altColor};
      transition: fill 0.1s ${easing.default};
    }

    .nav-bottom-border {
      opacity: 1;
    }
  }
`;

const InnerLink = styled(Flexbox)`
  cursor: pointer;
  min-width: 48px;
  flex-direction: column;
  align-items: center;
  margin: 0 8px;

  &:hover {
    transform: scale(1.05);
    transition: all 0.1s ${easing.default};
  }
`;

const New = styled.div`
  position: absolute;
  font-size: 11px;
  font-weight: 600;
  color: ${colors.green900};
  text-transform: uppercase;
  top: -5px;
  right: -30px;
`;

export { NavLink };
