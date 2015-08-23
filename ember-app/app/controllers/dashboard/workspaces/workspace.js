import Ember from 'ember';
import config from '../../../config/environment';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    host: config.API_HOST,

    newOwnerSelect: false,

    isModelNotChanged: function(){
        return !this.get('model.hasDirtyAttributes');
    }.property('model.hasDirtyAttributes'),

    isOwner: function() {
        return  this.get('model.owner.id') == this.get('session.userId');
    }.property('model'),

    isTransferDisabled: function(){
        this.set('newOwnerSelect', false);
        return $('select')[0]== null || $('select')[0].selectedOptions[0].value == "";
    }.property('newOwnerSelect', 'model'),

    actions: {

        onNewOwnerSelected(){
            this.set('newOwnerSelect', true);
        },

        saveWorkspace: function () {
            this.get('model').save();
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
        },

        unsubscribeContributor: function (wid) {
            var self = this;
            var _user;

            var removeFromContributors = function(workspace) {
                self.controllerFor('dashboard.workspaces').set('activeWorkspace', null);
                self.transitionToRoute('dashboard.workspaces.all');
                _user.get('workspacesContributing').removeObject(workspace);
            }

            var findWorkspace  = function () {
                self.store.find('workspace', wid).then(removeFromContributors);
            }

            var unsubscribeContributor = function (user) {
                _user = user;
                $.post(self.get('host') + '/api/users/' + user.id +'/workspaces/'+ wid +'/unsubscribe', findWorkspace);
            }

            var orFailGracefully = function () {
                console.log('email not found');
            }

            this.store.find('user', this.get('session.userId')).then(unsubscribeContributor, orFailGracefully);
        }
    }
});
