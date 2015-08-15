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

        addContributor: function (email, wid) {
            var self = this;

            var refreshModel = function(newModel) {
                self.set('model', newModel);
                self.set('newContributor', '');
            }

            var findNewModel  = function () {
                self.store.findRecord('workspace', wid, { reload: true }).then(refreshModel);
            }

            var addContributor = function (user) {
                $.post('http://localhost:8080/api/users/'+ user.id +'/workspaces/'+ wid +'/subscribe', findNewModel);
            }

            var orFailGracefully = function () {
                console.log('email not found');
            }

            this.store.findRecord('user', email).then(addContributor, orFailGracefully);
        }
    }
});
