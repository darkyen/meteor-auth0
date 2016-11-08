Package.describe({
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  'auth0-lock': '10.5.1',
  'qs': '6.3.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2');
  api.use('ecmascript');
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  api.use(['random', 'templating'], 'client');
  api.export('Auth0');

  api.addFiles(['auth0_configure.html', 'auth0_configure.js'], 'client');
  api.addFiles('auth0_server.js', 'server');
  api.addFiles('auth0_client.js', 'client');
});
