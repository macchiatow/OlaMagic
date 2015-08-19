import Ember from 'ember';

export default Ember.Route.extend({

    model: function() {
        return this.modelFor('dashboard');
    },

    afterModel: function(model) {
        var activeWorkspace = this.controllerFor('dashboard.workspaces').get('activeWorkspace');
        var firstWorkspace = model.get('workspaces.firstObject.id');
        this.transitionTo('dashboard.workspaces.workspace', activeWorkspace || firstWorkspace);
    }

});
