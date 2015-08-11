import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        deleteWorkspace: function (wid) {
            var model = this.get('model')
            var self = this;

            this.store.findRecord('workspace', wid).then(function (workspace) {
                self.transitionToRoute('dashboard.workspaces');
                workspace.destroyRecord();
            });

        }
    }
});
