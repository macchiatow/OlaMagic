import Ember from 'ember';
import config from '../../../config/environment';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    host: config.API_HOST,

    renameDisabled: true,

    isOwner: function() {
        return  this.get('model.owner.id') == this.get('session.userId');
    }.property('model.id'),

    actions: {
        renameEnable: function () {
            this.set('renameDisabled', false);
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

            var addContributor = function (users) {
                var uid = users.get('firstObject').id;
                $.post(self.get('host') + '/api/users/'+ uid +'/workspaces/'+ wid +'/subscribe', findNewModel);
            }

            var orFailGracefully = function () {
                console.log('email not found');
            }

            this.store.query('user', {email: email}).then(addContributor, orFailGracefully);
        },

        removeContributor: function (user, wid) {
            var self = this;

            var refreshModel = function(newModel) {
                self.set('model', newModel);
            }

            var findNewModel  = function () {
                self.store.findRecord('workspace', wid, { reload: true }).then(refreshModel);
            }

            var addContributor = function (users) {
                var uid = users.get('firstObject').id;
                $.post(self.get('host') + '/api/users/' + uid +'/workspaces/'+ wid +'/unsubscribe', findNewModel);
            }

            var orFailGracefully = function () {
                console.log('email not found');
            }

            this.store.query('user', {email: user.get('email')}).then(addContributor, orFailGracefully);
        }
    }
});
