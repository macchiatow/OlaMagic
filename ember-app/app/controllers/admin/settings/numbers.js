import Ember from 'ember';

export default Ember.Controller.extend({

    numberObject: {},

    actions: {

        addNumber: function () {
            this.store.createRecord('number', this.get('numberObject')).save();
            this.set('numberObject', {});
        },

        deleteNumber: function (id) {
            this.store.find('number', id).then(function (number) {
                number.destroyRecord();
            });
        }
    }
});
