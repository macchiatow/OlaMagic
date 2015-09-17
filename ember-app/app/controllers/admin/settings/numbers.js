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
        },

        queryEmail: function () {
            if (!this.get('unfilteredModel')){
                this.set('unfilteredModel', this.get('model'));
            };

            var self = this;

            if (this.get('searchNumber').length > 0){
                this.store
                    .query('number', {upid: this.get('searchNumber')})
                    .then(function (model) {
                        self.set('model', model);
                    });
            } else {
                this.set('model', this.get('unfilteredModel'));
            }

        }
    }
});
