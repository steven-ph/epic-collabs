import Head from 'next/head';
import { withAuth } from 'hoc/with-auth';
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

export default withAuth(BrowseProjectsPage, { isProtected: false });
