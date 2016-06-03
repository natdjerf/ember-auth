import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    changePassword (passwords) {
      this.get('auth').changePassword(passwords)
      // if you prefer to have your user sign out after changing password, uncomment out below
      // & direct the user back to sign-in page
      // transition to whereever is appropriate (home? previous page?)
      
      // .then(() => this.get('auth').signOut())
      // .then(() => this.transitionTo('sign-in'))
      .then(() => this.transitionTo('application'))
      .then(() => {
        this.get('flashMessages')
        .success('Successfully changed your password!');
      })
      // .then(() => {
      //   this.get('flashMessages').warning('You have been signed out.');
      // })
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },
  },
});
