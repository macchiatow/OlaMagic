import Ember from 'ember';

export default Ember.Route.extend({

    redirect: function() {
        var activeWorkspace = this.controllerFor('dashboard.workspaces').get('activeWorkspace');
        var firstWorkspace = this.modelFor('dashboard.workspaces').get('workspaces.firstObject.id');
        this.transitionTo('dashboard.workspaces.workspace', activeWorkspace || firstWorkspace);
    }

});
