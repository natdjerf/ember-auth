import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    signUp (credentials) {
      this.get('auth').signUp(credentials)
      // go to the auth folder > signUp method & pass credentials
      .then(() => this.get('auth').signIn(credentials))
      // automatically signIn after signUp (using the same credentials)
      .then(() => this.transitionTo('application'))
      // this brings you back the the url for the application
      .then(() => {
        this.get('flashMessages')
        .success('Successfully signed-up! You have also been signed-in.');
      })
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },
  },
});
