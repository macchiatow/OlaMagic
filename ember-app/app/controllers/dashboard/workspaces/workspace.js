import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        deleteWorkspace: function (wid) {
            var model = this.get('model')
            var self = this;
            console.log();

            var onSuccess = function() {
                self.transitionToRoute('dashboard.workspaces');
            };

            this.store.findRecord('workspace', wid).then(function (workspace) {
                self.transitionToRoute('dashboard.workspaces');
                workspace.destroyRecord();
            });

        }
    }
});
