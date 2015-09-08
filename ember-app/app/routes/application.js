import Ember from 'ember';

export default Ember.Route.extend({

    session: Ember.inject.service('session'),

    beforeModel: function () {
        this._super();
        var accessToken = localStorage.getItem('access_token');
        var account = JSON.parse(localStorage.getItem('account'));

        if (accessToken == null || account == null) {
            this.transitionTo('login');
        }

        this.set('session.user', account);
        Ember.$.ajaxSetup({
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
    }

});