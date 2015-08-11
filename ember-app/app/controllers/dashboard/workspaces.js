import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        newWorkspace: function () {
            var self = this;
            var _workspace;

            var updateModel = function(model){
                self.set('model', model);
                self.transitionToRoute('dashboard.workspaces.workspace', _workspace.id);
            }

            var queryStore = function(workspace) {
                _workspace = workspace;
                self.store.query('workspace', {user: 1}).then(updateModel);
            };

            this.store.createRecord('workspace').save().then(queryStore);

        }
    }
});
