import { ReactSVG } from 'react-svg';
import { Flexbox } from 'components/common';

const Loading = () => (
  <Flexbox flexDirection="column" justifyContent="center" alignItems="center" flexGrow={1} height="100%">
    <ReactSVG src="/images/svg/animated-rocket.svg" />
  </Flexbox>
);

export { Loading };
