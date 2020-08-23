```
function LinkAccountsWithSameEmailAddress(user, context, callback) {
  const _ = require('lodash');
  const request = require('request');

  const USER_API_URL = auth0.baseUrl + '/users';

  if (context.stats.loginsCount > 1) {
    return callback(null, user, context);
  }

  return getAccountsWithMatchingEmail(user)
    .then(matchingUserList => analyseLinking(user, matchingUserList))
    .then(targetUser => callback(null, targetUser, context))
    .catch(err => {
      callback(err);
    });

  function analyseLinking(user, matchingUserList) {
    const filteredUserList = matchingUserList.filter(matchingUser => matchingUser.user_id !== user.user_id);

    if (filteredUserList.length === 0) {
      return user;
    }

    var isSAML = user.user_id.split('|')[0] === 'samlp';

    /*
      It is a security problem to allow people who do not verified accounts to link
        with accounts of the same email address. This is because an attacking user
        can just create any account with an email address that matches one in our system,
        link, and then gain access.

      SAML users are never marked as 'verified' within Auth0, this is because they use
        an external system to verify credentials. Therefore we can allow auto linking.
    */
    if (!user.email_verified && !isSAML) {
      return denyLoginDueToExistingAccount(user, matchingUserList);
    }

    // the email IS verified...
    // if there is ONE other... then it's easy, we just link this account
    // in under the other
    if (filteredUserList.length === 1) {
      var targetUser = filteredUserList[0];
      if (targetUser.email_verified) {
        return mergeAccounts(user, targetUser);
      }
    } else {
      console.log('Multiple matching users. So deny.');
    }

    return denyLoginDueToExistingAccount(user, filteredUserList);
  }

  function mergeAccounts(
    newLoginMethodUser,
    originLoginMethodUser
  ) {
    // First part of the user_id is the provider, auth0, SAML, etc.
    var newLoginMethodProvider = newLoginMethodUser.user_id.split('|')[0];

    // Second part may contain multiple pipes (SAML), so the user id
    //   is is after the FIRST pipe eg. 'samlp|somedomain|someuser@somedomain.com'
    //   this returns 'somedomain|someuser@somedomain.com'
    var newLoginMethodUserIdentifierComponent = newLoginMethodUser.user_id
      .split('|')
      .slice(1)
      .join('|');

    const url = USER_API_URL + '/' + originLoginMethodUser.user_id + '/identities';
    return new Promise((resolve, reject) => {
      request.post(
        {
          url,
          headers: {
            Authorization: `Bearer ${auth0.accessToken}`,
          },
          json: {
            provider: newLoginMethodProvider,
            user_id: newLoginMethodUserIdentifierComponent,
          },
        },
        function(err, response, body) {
          const statusCode = _.get(response, 'statusCode');

          if (statusCode >= 400) {
            return reject(new Error('Error linking account: ' + response.statusMessage));
          }

          // Resumes the rest of the rules in the context of the original account
          context.primaryUser = originLoginMethodUser.user_id;

          // The newLoginMethod user is the new user that is created as a part of this sign in. But because
          //  we have merged this account with the primary account, we should run the rest of the rules
          //  as if they were the primary account. This means that the auth token given is the primary
          //  account, the roles are from the primary account, etc rather than the new one.
          return resolve(originLoginMethodUser);
        }
      );
    });
  }

  // this is a new user account
  // now let's see if there are other entries with the same email address
  function getAccountsWithMatchingEmail(user) {
    const email = _.get(user, 'email') || '';
    const userId = _.get(user, 'user_id') || '';

    return new Promise((resolve, reject) => {
      request.get(
        {
          url: USER_API_URL,
          headers: {
            Authorization: `Bearer ${auth0.accessToken}`,
          },
          qs: {
            search_engine: 'v3',
            q: `email:"${email}"`,
          },
          json: true
        },
        (err, response, body) => {
          const statusCode = _.get(response, 'statusCode');

          if (err) {
            return reject(err);
          }

          if (statusCode !== 200) {
            return reject(new Error(body));
          }

          const matchingUsers = body || [];
          return resolve(matchingUsers);
        }
      );
    });
  }

  function denyLoginDueToExistingAccount(user, matchingAccounts) {
    const loginTitleMap = {
      windowslive: 'Microsoft',
      github: 'GitHub',
      auth0: 'Username and Password',
      twitter: 'Twitter',
      facebook: 'Facebook',
      linkedin: 'LinkedIn',
      'google-oauth2': 'Google',
    };

    // first, we need to delete the new account
    return deleteAccount(user)
    .then(() => {
      // the user already has an account
      var loginProviders = _.without(
        _.map(matchingAccounts, function(userId) {
          var aryTmp = userId.user_id.split('|');
          return aryTmp.length === 2 ? loginTitleMap[aryTmp[0]] : null;
        }),
        null
      );

      var msg =
        'You already have an account with this email address. To access your existing account please login with ';

      if (loginProviders.length > 1) {
        msg += 'one of the following: ';
      }

      msg += loginProviders.join(', ') + '.';

      throw new UnauthorizedError(msg);
    });
  }

  function deleteAccount(user) {
    return new Promise((resolve) => {
      const url = USER_API_URL + '/' + encodeURI(user.user_id);
      request.delete(
        {
          url,
          headers: {
            Authorization: `Bearer ${auth0.accessToken}`,
          },
        },
        (err, response, body) => {
          const statusCode = _.get(response, 'statusCode');

          if (err || statusCode !== 200) {
            console.log(`Unexpected error removing account: ${statusCode} + ${err}`);
          }
          return resolve();
        }
      );
    });
  }
}
```
