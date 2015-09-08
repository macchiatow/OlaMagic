import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
    host: config.API_HOST,
    email: "",
    password: "",

    actions: {
        login: function () {
            var self = this
            this._postCredentials(this.get('email'), this.get('password'))
                .then(function (response) {
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    localStorage.setItem('account', atob(response.access_token.split('.')[1]));
                    self._transitionToDashboard()
                })
        }
    },

    _transitionToDashboard: function (){
        var roles = JSON.parse(localStorage.getItem('account')).roles
        if (roles.contains("ROLE_ADMIN")) {
            this.transitionToRoute('admin');
        } else {
            this.transitionToRoute('dashboard');
        }
    },

    _postCredentials: function (username, password){
        var host = this.get('host');
        var url = [host, 'oauth', 'login'].join('/');
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                type: "POST",
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                url : url,
                data: JSON.stringify({
                    username: username,
                    password: password
                })
            }).done(resolve).fail(reject)
        });
    }
});
