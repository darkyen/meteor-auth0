import qs from 'qs';
Auth0 = {};


Auth0.requestCredential = (options, credentialRequestCompleteCallback) => {

  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {
      authParams: {

      }
    };
  }

  var config = ServiceConfiguration.configurations.findOne({
    service: 'auth0'
  });

  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }

  const credentialToken = Random.secret();

  const loginStyle = OAuth._loginStyle('auth0', config, options);
  /* options will be passed to lock options */
  const query = Object.assign({
    scope: 'openid',
    client_id: config.client_id,
  }, options.authParams, {
    redirect_uri: OAuth._redirectUri('auth0', config),
    response_type: 'code',
    state: OAuth._stateParam(loginStyle, credentialToken, options && options.redirect_uri)
  });

  const loginUrl = `https://${config.domain}/authorize?${qs.stringify(query)}`;

  OAuth.launchLogin({
    loginService: 'auth0',
    loginStyle,
    loginUrl,
    credentialRequestCompleteCallback,
    credentialToken
  })
}
