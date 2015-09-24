import Ember from 'ember';

export default Ember.Controller.extend({

    availableNumbers: function(){
        return this.store.find('number', {availableOnly: true});
    }.property('active-workspace.workspace.numbers.@each'),

    availableSites: function(){
        return this.get('active-workspace.workspace.sites');
    }.property('active-workspace.workspace.sites'),

    myNumbers: function(){
        return this.get('active-workspace.workspace.numbers');
    }.property('active-workspace.workspace.numbers.@each'),

    actions: {
        buyNumber: function(){
            var workspace = this.get('active-workspace.workspace');
            var selectedNumber = this.get('selectedNumber');
            var selectedAdsource = this.get('selectedAdsource');
            selectedNumber.set('owner', workspace);
            selectedNumber.set('adsource', selectedAdsource);
            selectedNumber.save();
            this.set('selectedNumber', {});
        },

        releaseNumber: function(number){
            number.set('owner', '');
            number.save();
        },

        updateNumber: function (param) {
            param.save();
        },

        cancelUpdateNumber: function (param) {
            param.rollback();
        }

    }
});
