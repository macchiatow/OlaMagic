import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['session'],

    isLoggedIn: Ember.computed.alias('controllers.session.isAuthenticated'),
    userId: Ember.computed.alias('controllers.session.userId'),

    init: function () {
        this._super();
        this.set('userId', 1);
    }

});