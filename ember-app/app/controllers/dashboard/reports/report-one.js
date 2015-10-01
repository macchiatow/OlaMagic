import Ember from 'ember';

export default Ember.Controller.extend({

    report: function(){
        return this.get('model.firstObject.a');
    }.property('model'),

    actions: {


    }
});
