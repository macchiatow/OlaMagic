import Ember from 'ember';

export default Ember.Route.extend({

    model: function(params) {
        return this.store.findRecord('workspace', params.wid);
    },

    afterModel: function(model) {
        this.controllerFor('dashboard.workspaces').set('activeWorkspace', model.id);
    }

});
