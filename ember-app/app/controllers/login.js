import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        authenticate: function() {
            var credentials = this.getProperties('identification', 'password');
            var authenticator = 'simple-auth-authenticator:oauth2-password-grant';
            this.get('session').authenticate(authenticator, credentials);
            this.get('active-workspace').clean();
        }
    }
});