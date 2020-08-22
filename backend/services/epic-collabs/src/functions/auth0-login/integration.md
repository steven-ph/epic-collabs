```
function UserServiceIntegration(user, context, callback) {
  console.log('Running user service rule for client', context.clientID);

  function next(err) {
    if (err) {
      console.log('Error running rule');
      console.log(err);
      return callback(err);
    }

    console.log('Exiting user service rule');
    return callback(null, user, context);
  }

  console.log('Starting trigger user service');

  const namespace = 'https://ns.epic-collabs.vercel.app/';

  const clientId = 'hv66aWI0PhsX9ck0sZqPn4stO4fykSsR';
  const url = configuration.SERVICE_URL;
  const apiKey = configuration.SERVICE_API_KEY;

  const addUserDataToToken = function (token, data, profile) {
    if (!token || !data) {
      return;
    }

    if (data.roles) {
      token[namespace + 'roles'] = data.roles;
    }

    if (data.userCreatedAt) {
      token[namespace + 'userCreatedAt'] = data.userCreatedAt;
    }

    if (profile.impersonator) {
      token[namespace + 'impersonatorId'] = profile.impersonator.user_id;
    }
  };

  const getRolesForUser = ({ profile, cb }) => {
    const linkingAccountState = 'linkingAccount';
    const query = context.request.query;

    if (!query || (query.state !== linkingAccountState && query.nonce !== linkingAccountState)) {
      console.log('Sending profile to ' + url);

      const connection = {
        name: context.connection,
        strategy: context.connectionStrategy
      };

      request.post(
        {
          url,
          headers: {
            'x-api-key': apiKey
          },
          json: {
            version: 1,
            data: {
              clientId,
              connection,
              profile,
              query
            }
          }
        },
        (err, response, body) => {
          if (err) {
            console.log('Error calling user service');
            console.log(err);
            return cb(err);
          }

          console.log(`Received response: ${response.statusCode} ${response.statusMessage}`);

          [context.idToken, context.accessToken].forEach(token => addUserDataToToken(token, body, profile));

          cb(null);
        }
      );
    } else {
      cb(null);
    }
  };

  const profile = Object.assign(
    {
      originalUserId: user.user_id
    },
    user
  );

  getRolesForUser({ profile, cb: next });
}
```
