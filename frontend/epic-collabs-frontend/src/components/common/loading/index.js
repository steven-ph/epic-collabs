import { Flexbox } from 'components/common';
import { ReactSVG } from 'react-svg';

const Loading = ({ icon = 'animated-rocket' }) => (
  <Flexbox flexDirection="column" justifyContent="center" alignItems="center" flexGrow={1} height="100%">
    <ReactSVG src={`/images/svg/${icon}.svg`} />
  </Flexbox>
);

export { Loading };
