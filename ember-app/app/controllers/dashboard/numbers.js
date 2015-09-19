import Ember from 'ember';

export default Ember.Controller.extend({

    availableNumbers: function(){
        return this.store.find('number', {availableOnly: true});
    }.property('active-workspace.workspace.numbers.@each'),

    myNumbers: function(){
        return this.get('active-workspace.workspace.numbers');
    }.property('active-workspace.workspace.numbers.@each'),

    actions: {
        buyNumber: function(){
            var workspace = this.get('active-workspace.workspace');
            var selectedNumber = this.get('selectedNumber');
            selectedNumber.set('owner', workspace);
            selectedNumber.save();
        },

        releaseNumber: function(number){
            number.set('owner', '');
            number.save();
        }

    }
});
