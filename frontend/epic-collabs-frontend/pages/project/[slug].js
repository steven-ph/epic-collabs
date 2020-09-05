import { withRouter } from 'next/router';
import { CommonLayout } from 'layouts';
import { Project } from 'components/project';
import { Loading } from 'components/common';

const ProjectPage = ({
  router: {
    query: { slug }
  }
}) => {
  if (!slug) {
    return (
      <CommonLayout>
        <Loading />
      </CommonLayout>
    );
  }

  return (
    <CommonLayout>
      <Project slug={slug} />
    </CommonLayout>
  );
};

export default withRouter(ProjectPage);
