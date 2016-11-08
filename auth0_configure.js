Template.configureLoginServiceDialogForAuth0.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForAuth0.fields = function () {
  return [
    {property: 'client_id', label: 'Client ID'},
    {property: 'client_secret', label: 'Client Secret'},
    {property: 'domain', label: 'Auth0 Domain'}
  ];
};
