```
/**
@param {object} user - The user being created
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.password - user's password
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/
module.exports = function (user, context, cb) {
  const request = require('request');
  let err = null;
  var response = {};

  console.log(user.user_metadata)

  console.log('here', user.user_metadata.recaptcha);

  if (user.user_metadata && user.user_metadata.invitationCode) {
    response.user = user;
    cb(null, response);
  }


  if (user.user_metadata && user.user_metadata.recaptcha) {

      const secretKey = context.webtask.secrets.RECAPTCHA_SITE_SECRET;

      var options = {
       method: 'POST',
       url: 'https://www.google.com/recaptcha/api/siteverify',
       headers: {
       },
       formData: {secret: secretKey, response: user.user_metadata.recaptcha},
      };
      request(options,function(error,resp,body) {
        body = JSON.parse(body);
        if(body.success !== undefined && !body.success) {
          err = new Error('Failed captcha verification');
          return cb(err);
        }
        user.user_metadata = {};
        response.user = user;
        cb(null, response);
      });
  } else {
      err = new Error('Unknown source');
      cb(err)
  }
};
```
