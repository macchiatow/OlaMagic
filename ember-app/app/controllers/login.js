import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        authenticate: function () {
            const self = this;
            var credentials = this.getProperties('identification', 'password');
            var authenticator = 'simple-auth-authenticator:oauth2-password-grant';
            this.get('session').authenticate(authenticator, credentials)
                .then(function () {
                    self.get('active-workspace').clean();
                });
        }
    }
});