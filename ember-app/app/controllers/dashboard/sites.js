import Ember from 'ember';

export default Ember.Controller.extend({

    mySites: function(){
        return this.get('active-workspace.workspace.sites');
    }.property('active-workspace.workspace.sites.@each'),

    actions: {
        addSite: function(){
            var workspace = this.get('active-workspace.workspace');
            var name = this.get('siteName');
            this.store.createRecord('site', {name: name, workspace: workspace}).save();
            this.set('siteName', '');
        },

        removeSite: function(site){
            site.destroyRecord();
        },

        updateSite: function (param) {
            param.save();
        },

        cancelUpdateSite: function (param) {
            param.rollback();
        }

    }
});
