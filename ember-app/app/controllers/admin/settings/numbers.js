import Ember from 'ember';

export default Ember.Controller.extend({

    numberObject: {},

    actions: {

        addNumber: function () {
            var self = this;

            this.store.createRecord('number', this.get('numberObject'))
                .save().then(function () {
                    self.set('numberObject', {});
                    self.send('query');
                });
        },

        deleteNumber: function (id) {
            var self = this;

            this.store.find('number', id).then(function (number) {
                number.destroyRecord().then(function () {
                    self.send('query');
                });
            });
        },

        query: function () {
            if (!this.get('unfilteredModel')){
                this.set('unfilteredModel', this.get('model'));
            };

            var self = this;

            if (this.get('searchNumber') && this.get('searchNumber').length > 0){
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
