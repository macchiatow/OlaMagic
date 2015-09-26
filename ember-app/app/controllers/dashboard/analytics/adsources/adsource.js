import Ember from 'ember';

export default Ember.Controller.extend({

    adsourceType: 0,

    availableTypes: function(){
        return [{"id":0,"title":"offline"}, {"id":1, "title":"seo"}, {"id":2, "title":"context"}];
    }.property(),

    isModelNotChanged: function(){
        return !this.get('model.hasDirtyAttributes');
    }.property('model.hasDirtyAttributes'),

    myNumbers: function(){
        return this.get('active-workspace.workspace.numbers');
    }.property('active-workspace.workspace.numbers.@each'),

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
            this.get('model').save();
        },

        cancelUpdateAdsource: function (param) {
            param.rollback();
        },

        assignNumber: function(){
            var selectedNumber = this.get('selectedNumber');
            var selectedAdsource = this.get('model.id');
            selectedNumber.set('adsource', selectedAdsource);
            selectedNumber.save();
            this.set('selectedNumber', {});
        }

    }
});
