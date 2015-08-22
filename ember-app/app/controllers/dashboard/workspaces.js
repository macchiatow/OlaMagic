import Ember from 'ember';

export default Ember.Controller.extend({

    session: Ember.inject.service('session'),

    actions: {
        newWorkspace: function () {
            var userId = this.get('session.userId');
            var self = this;
            var _workspace;

            var updateModel = function(model){
                self.set('model', model);
                self.transitionToRoute('dashboard.workspaces.workspace', _workspace.id);
            }

            var queryStore = function(workspace) {
                _workspace = workspace;
                self.store.find('user', userId, { reload: true }).then(updateModel);
            };

            this.store.find('user', userId).then(function(user) {
                self.store.createRecord('workspace', {owner: user}).save().then(queryStore);
            })

        }
    }
});
