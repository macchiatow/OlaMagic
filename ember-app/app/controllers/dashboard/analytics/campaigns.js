import Ember from 'ember';

export default Ember.Controller.extend({

    myCampaigns: function(){
        return this.get('active-workspace.activeSite.campaigns');
    }.property('active-workspace.activeSite.campaigns.@each'),

    actions: {
        addCampaign: function(){
            var site = this.get('active-workspace.activeSite');
            var name = this.get('campaignName');
            this.store.createRecord('campaign', {name: name, site: site}).save();
            this.set('campaignName', '');
        },

        removeCampaign: function(campaign){
            campaign.destroyRecord();
        },

        updateCampaign: function (param) {
            param.save();
        },

        cancelUpdateCampaign: function (param) {
            param.rollback();
        }

    }
});
