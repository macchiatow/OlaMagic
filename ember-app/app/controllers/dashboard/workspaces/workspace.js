import Ember from 'ember';
import config from '../../../config/environment';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    host: config.API_HOST,
    newOwnerSelected: false,

    isModelNotChanged: function(){
        return !this.get('model.hasDirtyAttributes');
    }.property('model.hasDirtyAttributes'),

    isOwner: function() {
        return  this.get('model.owner.id') == this.get('session.user.id');
    }.property('model'),

    isTransferDisabled: function(){
        return $('#new-owner-select option:selected').val() == "";
    }.property('newOwnerSelected', 'model'),

    actions: {

        selectNewOwner(){
            this.set('newOwnerSelected', !this.get('newOwnerSelected'));
        },

        saveWorkspaceTitle: function () {
            this.get('model').save();
        },

        deleteWorkspace: function () {
            var self = this;
            var model = this.get('model');

            this.store.findRecord('workspace', model.id).then(function (workspace) {
                self._transitionToAll();
                workspace.destroyRecord();
            });
        },

        addContributor: function (email) {
            var user;
            var self = this;
            var model = this.get('model');

            var updateModel  = function () {
                self.set('newContributor', '');
                model.get('contributors').addObject(user);
            }

            var postAction = function (users) {
                user = users.get('firstObject');
                self._postWorkspaceAction(user.id, model.id, 'subscribe', updateModel);
            }

            var orFailGracefully = function () {
                console.log('email not found');
            }

            this.store.query('user', {email: email}).then(postAction, orFailGracefully);
        },

        removeContributor: function (user) {
            var model = this.get('model');

            this._postWorkspaceAction(user.id, model.id, 'unsubscribe', function () {
                model.get('contributors').removeObject(user);
            });
        },

        unsubscribeFromWorkspace: function () {
            var self = this;
            var currentUser = this.get('session.user');
            var model = this.get('model');

            this._postWorkspaceAction(this.get('session.user.id'), model.id, 'unsubscribe', function() {
                currentUser.get('workspacesContributing').removeObject(model);
                self._transitionToAll();
            })
        },

        changeOwner: function () {
            var self = this;
            var currentUser = this.get('session.user');
            var model = this.get('model');
            var newOwner = $('#new-owner-select option:selected').val();

            this._postWorkspaceAction(newOwner, model.id, 'change_owner', function() {
                currentUser.get('workspacesOwning').removeObject(model);
                self._transitionToAll();
            })
        }
    },

    //private API

    _postWorkspaceAction: function (uid, wid, action, callback){
        var host = this.get('host');
        var url = [host, 'api', 'users', uid, 'workspaces', wid, action].join('/');
        $.post(url, callback);
    },

    _transitionToAll: function (){
        this.controllerFor('dashboard.workspaces').set('activeWorkspace', null);
        this.transitionToRoute('dashboard.workspaces.all');
    }
});
