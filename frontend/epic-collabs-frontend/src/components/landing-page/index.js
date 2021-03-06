import { Flexbox, ImageContainer } from 'components/common';
import React from 'react';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import styled from 'styled-components';
import { breakpoints, colors } from 'styles';

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/svg/${name}.svg${wrap ? ')' : ''}`;

const LandingPage = () => {
  return (
    <Parallax pages={3}>
      <ParallaxLayer offset={2} speed={1} sx={{ backgroundColor: colors.blue400 }} />

      <ParallaxLayer
        offset={0}
        speed={0}
        factor={1}
        sx={{
          zIndex: 1,
          backgroundImage: url('stars', true),
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      />

      <ParallaxLayer
        offset={1}
        speed={0}
        factor={1}
        sx={{
          zIndex: 1,
          backgroundImage: url('stars', true),
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      />

      <ParallaxLayer
        offset={2}
        speed={0}
        factor={1}
        sx={{
          zIndex: 1,
          backgroundImage: url('stars', true),
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      />

      <ParallaxLayer offset={1.3} speed={-0.3}>
        <img src={url('flying-rocket')} sx={{ width: '15%', marginLeft: '10%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.8} sx={{ opacity: 0.1, zIndex: 1 }}>
        <img src={url('cloud')} sx={{ display: 'block', width: '10%', marginLeft: '55%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '5%', marginLeft: '15%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={1.75} speed={0.5} sx={{ opacity: 0.1, zIndex: 1 }}>
        <img src={url('cloud')} sx={{ display: 'block', width: '10%', marginLeft: '70%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '10%', marginLeft: '40%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.2} sx={{ opacity: 0.2, zIndex: 1 }}>
        <img src={url('cloud')} sx={{ display: 'block', width: '5%', marginLeft: '10%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '10%', marginLeft: '75%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={1.6} speed={-0.1} sx={{ opacity: 0.4, zIndex: 1 }}>
        <img src={url('cloud')} sx={{ display: 'block', width: '10%', marginLeft: '60%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '12%', marginLeft: '30%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '5%', marginLeft: '80%' }} />
      </ParallaxLayer>

      <ParallaxLayer offset={2.6} speed={0.4} sx={{ opacity: 0.6, zIndex: 1 }}>
        <img src={url('cloud')} sx={{ display: 'block', width: '5%', marginLeft: '15%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '12%', marginLeft: '30%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '7%', marginLeft: '75%' }} />
        <img src={url('cloud')} sx={{ display: 'block', width: '5%', marginLeft: '80%' }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={2.25}
        speed={-0.4}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
      >
        <img src={url('earth')} sx={{ width: '25%' }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={1.9}
        speed={-0.3}
        sx={{
          zIndex: 1
        }}
      >
        <img src={url('satellite2')} sx={{ width: '15%', marginTop: '15%', marginLeft: '15%' }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={2.1}
        speed={-0.3}
        sx={{
          zIndex: 1
        }}
      >
        <img src={url('satellite4')} sx={{ width: '15%', marginLeft: '75%' }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0}
        speed={0.1}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Flexbox flexDirection="column" justifyContent="center">
          <Headline>Find collaborators</Headline>
          <Headline>Build projects</Headline>
          <ImageContainer
            src="https://res.cloudinary.com/ptviet/image/upload/v1599033365/epic-collabs/meeting.png"
            alt="Epic Collabs"
          />
        </Flexbox>
      </ParallaxLayer>

      <ParallaxLayer
        offset={1}
        speed={0.1}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img src={url('bash')} sx={{ width: '30%' }} />
      </ParallaxLayer>

      <ParallaxLayer
        offset={1.9}
        speed={0.1}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `linear-gradient(to bottom, ${colors.navy900} 0%, ${colors.blue400} 100%)`
        }}
      >
        <img src={url('clients-main')} sx={{ width: '25%' }} />
      </ParallaxLayer>
    </Parallax>
  );
};

const Headline = styled.span`
  font-size: 24px;
  text-align: center;
  color: ${colors.lightGrey400};

  @media screen and (min-width: ${breakpoints.md}) {
    font-size: 32px;
    font-weight: 700;
  }
`;

export { LandingPage };
