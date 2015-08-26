import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    actions: {
        newWorkspace: function () {
            var self = this;
            var user = this.get('session.user');

            this.store.createRecord('workspace', {owner: user})
                .save()
                .then(function(workspace) {
                    user.get('workspacesOwning').addObject(workspace);
                    self.transitionToRoute('dashboard.workspaces.workspace', workspace.id);
                })
        }
    }
});
