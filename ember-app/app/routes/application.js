import Ember from 'ember';

export default Ember.Route.extend({

    session: Ember.inject.service('session'),

    beforeModel: function () {
        var self = this;
        this._super();
        this.set('session.userId', 1);

        this.store.find('user', 1).then(function (user) {
            self.set('session.user', user);
        });
    }

});