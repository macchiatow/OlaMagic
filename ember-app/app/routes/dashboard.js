import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    allowedAuthority: 'ROLE_NO_ROLES',

    model: function() {
        return this.store.find('user', this.get('session.secure.account.id'));
    },

    beforeModel: function(transition) {
        this._super(transition);
        this.validateAuthority();
    },

    validateAuthority: function(){
        if(!this.get('session.secure.account.roles').contains(this.get('allowedAuthority'))){
            this.transitionTo('authority-based-router');
        }
    }

});
