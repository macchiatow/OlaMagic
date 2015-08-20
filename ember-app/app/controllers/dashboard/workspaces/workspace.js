import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    renameDisabled: true,

    isOwner: function() {
        return  this.get('model.owner') == this.get('session.userId');
    }.property('model.id'),

    actions: {
        renameEnable: function () {
            this.set('renameDisabled', false);
        },

        unsubscribeWorkspace: function (uid, wid) {
            var self = this;

            var refreshModel = function(newModel) {
                self.set('model', newModel);
                self.set('newContributor', '');
            }

            var findNewModel  = function () {
                self.store.findRecord('workspace', wid, { reload: true }).then(refreshModel);
            }

            var addContributor = function (user) {
                $.post('http://localhost:8080/api/users/'+ uid +'/workspaces/'+ wid + '/unsubscribe', findNewModel);
            }

            var orFailGracefully = function () {
                console.log('email not found');
            }

            this.store.findRecord('user', email).then(addContributor, orFailGracefully);
        },

        renameWorkspace: function (newTitle, id) {
            var model = this.get('model');
            model.set('title', newTitle);
            model.save();

            this.set('renameDisabled', true);
        },

        deleteWorkspace: function (id) {
            var self = this;

            var destroyRecord = function (workspace) {
                self.controllerFor('dashboard.workspaces').set('activeWorkspace', null);
                self.transitionToRoute('dashboard.workspaces.all');
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
        },

        removeContributor: function (email, wid) {
            var self = this;

            var refreshModel = function(newModel) {
                self.set('model', newModel);
            }

            var findNewModel  = function () {
                self.store.findRecord('workspace', wid, { reload: true }).then(refreshModel);
            }

            var addContributor = function (user) {
                $.post('http://localhost:8080/api/users/'+ user.id +'/workspaces/'+ wid +'/unsubscribe', findNewModel);
            }

            var orFailGracefully = function () {
                console.log('email not found');
            }

            this.store.findRecord('user', email).then(addContributor, orFailGracefully);
        }
    }
});
