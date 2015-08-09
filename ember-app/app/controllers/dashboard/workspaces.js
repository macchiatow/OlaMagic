import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        newWorkspace: function () {
            var model = this.get('model')
            var self = this;

            var onSuccess = function(workspace) {
                model.addObject(workspace);
                self.transitionToRoute('dashboard.workspaces.workspace', workspace.id);
            };

            this.store.createRecord('workspace', {
                title: 'Rails is Omakase'
            }).save().then(onSuccess);

        }
    }
});
