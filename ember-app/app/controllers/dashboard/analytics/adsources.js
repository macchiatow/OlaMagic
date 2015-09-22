import Ember from 'ember';

export default Ember.Controller.extend({

    adsourceType: 0,

    availableTypes: function(){
        return [{"id":0,"title":"offline"}, {"id":1, "title":"seo"}, {"id":2, "title":"context"}];
    }.property(),

    myAdsources: function(){
        return this.get('active-workspace.activeSite.adsources');
    }.property('active-workspace.activeSite.adsources.@each'),

    actions: {
        addAdsource: function(){
            var site = this.get('active-workspace.activeSite');
            var name = this.get('adsourceName');
            var type = this.get('adsourceType');
            this.store.createRecord('adsource', {name: name, type: type, site: site}).save();
            this.set('adsourceName', '');
            this.set('adsourceType', 0);

        },

        removeAdsource: function(adsource){
            adsource.destroyRecord();
        },

        updateAdsource: function (param) {
            param.save();
        },

        cancelUpdateAdsource: function (param) {
            param.rollback();
        }

    }
});
