import Ember from 'ember';

export default Ember.Route.extend({

    session: Ember.inject.service('session'),

    beforeModel: function () {
        this._super();
        this.set('session.user', ENV.currentUser);
    }

});