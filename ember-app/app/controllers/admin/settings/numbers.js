import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {

        addNumber: function () {
            this.store.createRecord('number', {upid: this.get('upid')}).save();
            this.set('upid','');
        },

        deleteNumber: function (id) {
            this.store.findRecord('number', id).then(function (number) {
                number.destroyRecord();
            });
        }
    }
});
