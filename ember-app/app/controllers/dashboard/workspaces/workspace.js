import Ember from 'ember';
import config from '../../../config/environment';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    host: config.API_HOST,

    newOwnerSelect: false,

    newOwner: "",

    isModelNotChanged: function(){
        return !this.get('model.hasDirtyAttributes');
    }.property('model.hasDirtyAttributes'),

    isOwner: function() {
        return  this.get('model.owner.id') == this.get('session.userId');
    }.property('model'),

    isTransferDisabled: function(){
        this.set('newOwner', $('#new-owner-select option:selected').val());
        return this.get('newOwner') == "";
    }.property('newOwnerSelect', 'model'),

    actions: {

        onNewOwnerSelected(){
            this.set('newOwnerSelect', !this.get('newOwnerSelect'));
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

        addContributor: function (email) {
            var user;
            var self = this;
            var model = this.get('model');

            var refreshModel  = function () {
                self.set('newContributor', '');
                model.get('contributors').addObject(user);
            }

            var addContributor = function (users) {
                user = users.get('firstObject');
                $.post(self.get('host') + '/api/users/' + user.id +'/workspaces/' + model.id + '/subscribe', refreshModel);
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

        unsubscribeContributor: function () {
            var self = this;
            var currentUser = this.get('session.user');
            var model = this.get('model');

            var removeFromContributors = function() {
                self.controllerFor('dashboard.workspaces').set('activeWorkspace', null);
                self.transitionToRoute('dashboard.workspaces.all');
                currentUser.get('workspacesContributing').removeObject(model);
            }

            $.post(this.get('host') + '/api/users/' + this.get('session.userId') +'/workspaces/'+ this.get('model.id') +'/unsubscribe', removeFromContributors);
        },

        changeOwner: function () {
            var self = this;
            var currentUser = this.get('session.user');
            var model = this.get('model');

            var removeFromContributors = function() {
                self.controllerFor('dashboard.workspaces').set('activeWorkspace', null);
                self.transitionToRoute('dashboard.workspaces.all');
                currentUser.get('workspacesOwning').removeObject(model);
            }

            $.post(self.get('host') + '/api/users/' + this.get('newOwner') +'/workspaces/'+ this.get('model.id') +'/change_owner', removeFromContributors);
        }
    }
});
