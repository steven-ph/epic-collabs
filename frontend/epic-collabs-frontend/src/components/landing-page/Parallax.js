import React, { useRef } from 'react';
import styled from 'styled-components';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import { breakpoints, colours, easing } from 'styles';
import { Flexbox } from 'components/common';

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/svg/${name}.svg${wrap ? ')' : ''}`;

const ParallaxPage = () => {
  const parallaxRef = useRef();

  return (
    <Parallax ref={ref => (parallaxRef.current = ref)} pages={3}>
      <ParallaxLayer offset={1} speed={1} sx={{ backgroundColor: colours.indigo400 }} />
      <ParallaxLayer offset={2} speed={1} sx={{ backgroundColor: colours.blue400 }} />

      <ParallaxLayer
        offset={0}
        speed={0}
        factor={3}
        sx={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }}
      />

      <ParallaxLayer offset={1.3} speed={-0.3} sx={{ pointerEvents: 'none' }}>
        <img src={url('satellite4')} sx={{ width: '15%', marginLeft: '70%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.8} sx={{ opacity: 0.1 }}>
        <img src={url('cloud')} sx={{ display: 'block', width: '20%', marginLeft: '55%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '10%', marginLeft: '15%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={1.75} speed={0.5} sx={{ opacity: 0.1 }}>
        <img src={url('cloud')} sx={{ display: 'block', width: '20%', marginLeft: '70%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '20%', marginLeft: '40%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.2} sx={{ opacity: 0.2 }}>
        <img src={url('cloud')} sx={{ display: 'block', width: '10%', marginLeft: '10%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '20%', marginLeft: '75%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={1.6} speed={-0.1} sx={{ opacity: 0.4 }}>
        <img src={url('cloud')} sx={{ display: 'block', width: '20%', marginLeft: '60%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '25%', marginLeft: '30%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '10%', marginLeft: '80%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={2.6} speed={0.4} sx={{ opacity: 0.6 }}>
        <img src={url('cloud')} sx={{ display: 'block', width: '20%', marginLeft: '5%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '15%', marginLeft: '75%' }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={2.5}
        speed={-0.4}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
      >
        <img src={url('earth')} sx={{ width: '60%' }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={2}
        speed={-0.3}
        sx={{
          backgroundSize: '80%',
          backgroundPosition: 'center',
          backgroundImage: url('clients', true)
        }}
      />

      <ParallaxLayer
        offset={0}
        speed={0.1}
        onClick={() => parallaxRef.current.scrollTo(1)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Flexbox flexDirection="column" justifyContent="center">
          <Headline>Find collaborators</Headline>
          <Headline>Build projects</Headline>
          <Img src="/images/meeting.png" alt="Epic Collabs" />
        </Flexbox>
      </ParallaxLayer>

      <ParallaxLayer
        offset={1}
        speed={0.1}
        onClick={() => parallaxRef.current.scrollTo(2)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img src={url('bash')} sx={{ width: '40%' }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={2}
        speed={-0}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => parallaxRef.current.scrollTo(0)}
      >
        <img src={url('clients-main')} sx={{ width: '40%' }} />
      </ParallaxLayer>
    </Parallax>
  );
};

const Headline = styled.span`
  font-size: 24px;
  text-align: center;
  color: ${colours.lightGrey400};

  @media screen and (min-width: ${breakpoints.md}) {
    font-size: 32px;
    font-weight: 700;
  }
`;

const Img = styled.img`
  align-self: center;
  margin: 32px;
  width: 500px;
  height: 500px;
  transition: all 0.2s ${easing.default};

  @media screen and (max-width: ${breakpoints.sm}) {
    margin: 16px;
    width: 280px;
    height: 280px;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    margin: 16px;
    width: 380px;
    height: 380px;
  }
`;

export { ParallaxPage };
