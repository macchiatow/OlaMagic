import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {

        deleteWorkspace: function (id) {
            var self = this;

            var destroyRecord = function (workspace) {
                self.transitionToRoute('dashboard.workspaces');
                workspace.destroyRecord();
            }

            this.store.findRecord('workspace', id).then(destroyRecord);

        },

        addContributor: function (email) {
            console.log(email);
        }
    }
});
