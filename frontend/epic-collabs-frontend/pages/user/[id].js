import { withRouter } from 'next/router';
import { CommonLayout } from 'layouts';
import { Loading } from 'components/common';
import { UserProfile } from 'components/user-profile';

const UserPage = ({
  router: {
    query: { id }
  }
}) => {
  if (!id) {
    return (
      <CommonLayout>
        <Loading />
      </CommonLayout>
    );
  }

  return (
    <CommonLayout>
      <UserProfile userId={id} />
    </CommonLayout>
  );
};

export default withRouter(UserPage);
