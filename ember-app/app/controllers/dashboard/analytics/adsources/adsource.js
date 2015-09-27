import Ember from 'ember';

export default Ember.Controller.extend({

    adsourceType: 0,

    availableTypes: function(){
        return [{"id":0,"title":"offline"}, {"id":1, "title":"seo"}, {"id":2, "title":"context"}];
    }.property(),

    isModelNotChanged: function(){
        return !this.get('model.hasDirtyAttributes');
    }.property('model.hasDirtyAttributes'),

    unassignedNumbers: function(){
        var workspace = this.get('active-workspace.workspace.id');
        return this.store.query('number', {workspace: workspace, adsource: ''});
    }.property('numbersChanged'),

    isAddButtonDisabled: function(){
        return this.get('selectedNumber') == null;
    }.property('selectedNumber'),

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
            var self = this;
            var selectedNumber = this.get('selectedNumber');
            selectedNumber.set('adsource', this.get('model'));
            selectedNumber.save().then(function(){
                self.toggleProperty('numbersChanged');
                self.set('selectedNumber', null);
            });
        },

        unassignNumber: function(number){
            var self = this;
            number.set('adsource', null);
            number.save().then(function(){
                self.toggleProperty('numbersChanged');
                self.set('selectedNumber', null);
            });
        }

    }
});
