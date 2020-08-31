import Head from 'next/head';
import { withAuth } from 'components/hoc/with-auth';
import { CommonLayout } from 'layouts';
import { Projects } from 'components/projects';

const ProjectsPage = props => {
  return (
    <>
      <Head>
        <title>Epic Collabs | Projects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CommonLayout>
        <Projects {...props} />
      </CommonLayout>
    </>
  );
};

export default withAuth(ProjectsPage, { isProtected: false });
