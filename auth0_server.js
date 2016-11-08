Auth0 = {};

OAuth.registerService('auth0', 2, null, (query) => {

  const [idToken, refreshToken] = getTokens(query);
  const profile = getProfile(idToken);

  return {
    serviceData: {
      id: profile.user_id,
      accessToken: OAuth.sealSecret(idToken),
      email: profile.email,
      username: profile.username,
    },
    options: {
      profile
    }
  };

});

// Helps tracking UserAgent
var userAgent = 'Meteor';
if (Meteor.release)
  userAgent += '/' + Meteor.release;

var getTokens = function (query) {

  var config = ServiceConfiguration.configurations.findOne({
    service: 'auth0'
  });

  if (!config) {
    throw new ServiceConfiguration.ConfigError('Auth0 not configured');
  }

  if ( query.error ) {
    throw new Error(`Failed to complete OAuth handshake with Auth0 ${err.error}`);
  }

  var response;
  try {

    response = HTTP.post(
      `https://${config.domain}/oauth/token`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': userAgent
        },
        data: {
          code: query.code,
          client_id: config.client_id,
          client_secret: OAuth.openSecret(config.secret),
          grant_type: 'authorization_code',
          redirect_uri: OAuth._redirectUri('auth0', config),
        }
      });
  } catch (err) {
    throw new Error('Failed to complete OAuth handshake with Auth0 ' + err.message);
  }

  if (response.data.error) {
    throw new Error('Failed to complete OAuth handshake with Auth0. ' + response.data.error);
  } else {
    const {
      id_token, refresh_token
    } = response.data;
    return [id_token, refresh_token];
  }

};

var getProfile = function (idToken) {
  var config = ServiceConfiguration.configurations.findOne({
    service: 'auth0'
  });

  try {
    return HTTP.get(
      `https://${config.domain}/tokeninfo`, {
        headers: {
          'User-Agent': userAgent
        },
        params: {
          'id_token': idToken
        }
      }).data;
  } catch (err) {
    throw new Error(`Failed to fetch identity from Auth0 ${err.message}`);
  }
};

Auth0.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
