import Ember from 'ember';

export default Ember.Route.extend({

    model: function(params) {
        return this.store.findRecord('workspace', params.wid);
    },

    afterModel: function(model) {
        this.controllerFor('dashboard.workspaces').set('activeWorkspace', model.id);
    },

    actions: {
        willTransition: function(transition) {
            if (transition.targetName === 'dashboard.workspaces.index') {
                transition.abort();
            } else {
                return false;
            }
        }
    }
});
