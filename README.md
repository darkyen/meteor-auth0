# Meteor-auth0
Package Adds support for for using Auth0 in meteor. This will require the accounts-auth0
package to enable `Meteor.loginWithAuth()`.

In order to configure the login page please visit

- https://manage.auth0.com
- From the side bar click on Hosted Pages
- Under Hosted Pages click on Login Page


This hosted login page will be used as a login page which will open in a popup or redirect
mode, you can pass query string parameters as mentioned at https://auth0.com/docs/authentication
to the options object under authParams dictionary.
