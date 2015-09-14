import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {

        addNumber: function (upid) {
            this.store.createRecord('number', {upid: upid}).save();
        }
    }
});
