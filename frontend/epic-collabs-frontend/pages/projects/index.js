import Head from 'next/head';
import { CommonLayout } from 'layouts';
import { Projects } from 'components/projects';

const BrowseProjectsPage = props => {
  return (
    <>
      <Head>
        <title>Epic Collabs | Browse Projects</title>
      </Head>
      <CommonLayout>
        <Projects {...props} />
      </CommonLayout>
    </>
  );
};

export default BrowseProjectsPage;
