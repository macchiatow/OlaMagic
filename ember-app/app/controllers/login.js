import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
    host: config.API_HOST,
    email: "",
    password: "",

    actions: {
        login: function () {
            this._postCredentials(this.get('email'), this.get('password'))
                .then(function (response) {
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    localStorage.setItem('account', atob(response.access_token.split('.')[1]));
                })
        }
    },

    _postCredentials: function (username, password){
        var host = this.get('host');
        var url = [host, 'oauth', 'login'].join('/');
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                type: "POST",
                url : url,
                data: JSON.stringify({
                    username: username,
                    password: password
                })
            }).done(resolve).fail(reject)
        });
    }
});
