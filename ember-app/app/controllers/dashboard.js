import Ember from 'ember';

export default Ember.Controller.extend({

    activeWorkspaceTitle: function(){
        return this.get('active-workspace.workspace.title')
    }.property('active-workspace.workspace.id'),

    availableSites: function(){
        return this.get('active-workspace.workspace.sites')
    }.property('active-workspace.workspace.sites.@each'),

    actions: {

    }
});
