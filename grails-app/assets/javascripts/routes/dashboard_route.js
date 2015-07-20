/**
 * Created by togrul on 7/19/15.
 */
OlaMagic.DashboardRoute = Ember.Route.extend({
    model: function(params) {
        console.log(params);
        return this.store.query('workspace', {user: ':uid'});
    }

});