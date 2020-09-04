import React, { useState } from 'react';
import { message } from 'antd';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { colours, defaultTheme } from 'styles';
import { Box, Flexbox } from 'components/common';
import { EditButton } from 'components/user-profile/common';
import { SectionLayout } from 'components/user-profile/layout';
import { AboutMeForm } from 'components/user-profile/forms/AboutMeForm';

const { fontSizes, fontWeights } = defaultTheme;

const Biography = ({ bio, userId, isOwnProfile }) => {
  const [editing, setEditing] = useState(false);

  const onUpdate = msg => {
    setEditing(false);
    message.success(msg);
  };

  const onError = msg => {
    message.error(msg);
  };

  const onCancel = () => {
    setEditing(false);
  };

  const readView = !bio ? (
    <EmptyBio> {isOwnProfile ? "You haven't added a bio yet" : "There isn't a bio here yet!"}</EmptyBio>
  ) : (
    <Bio>
      <ReactMarkdown source={bio} linkTarget={'_blank'} disallowedTypes={['image']} />
    </Bio>
  );

  const ownerReadView = (
    <Flexbox width={'100%'} flexDirection={'row'} justifyContent={'space-between'}>
      <Box width={'80%'}>{readView}</Box>
      <Box width={'20%'} textAlign={'right'}>
        <EditButton onClick={() => setEditing(true)} />
      </Box>
    </Flexbox>
  );

  const ownerEditView = (
    <AboutMeForm userId={userId} bio={bio} onUpdate={onUpdate} onError={onError} onCancel={onCancel} />
  );

  const ownerView = editing ? ownerEditView : ownerReadView;

  return isOwnProfile ? ownerView : readView;
};

const AboutMe = ({ profile, isOwnProfile }) => {
  const { _id, bio } = profile;

  return (
    <SectionLayout heading={'About Me'}>
      <Biography bio={bio} userId={_id} isOwnProfile={isOwnProfile} />
    </SectionLayout>
  );
};

const Bio = styled.span`
  font-weight: ${fontWeights.regular};
  font-size: ${fontSizes.sm};
  color: ${colours.darkGrey800};
`;

const EmptyBio = styled.span`
  font-weight: ${fontWeights.regular};
  font-size: ${fontSizes.sm};
  font-style: italic;
  color: ${colours.darkGrey100};
`;

export { AboutMe };
