import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    actions: {
        newWorkspace: function () {
            var self = this;
            var user = this.controllerFor('dashboard').model;

            this.store.createRecord('workspace', {owner: user})
                .save()
                .then(function(workspace) {
                    self.transitionToRoute('dashboard.workspaces.workspace', workspace.id);
                });
        }
    }
});
