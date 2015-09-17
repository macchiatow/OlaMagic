import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    beforeModel: function(transition) {
        this._super(transition);
        var authorities = this.get('session.secure.account.roles');

        if(authorities.contains('ROLE_ADMIN')){
            this.transitionTo('admin');
        } else if (authorities.contains('ROLE_USER')){
            this.transitionTo('dashboard');
        } else {
            this.get('session').invalidate();
        }
    }

});
