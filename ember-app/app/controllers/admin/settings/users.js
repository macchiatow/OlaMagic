import Ember from 'ember';

export default Ember.Controller.extend({

    userObject: {enabled: true},

    actions: {

        createUser: function () {
            var self = this;

            this.store.createRecord('user', this.get('userObject'))
                .save()
                .then(function (user) {
                    user.set('password', undefined)
                    self.set('userObject', {enabled: true});
                    self.send('query');
                });
        },

        updateUser: function (param) {
            param.save();
            param.set('password', '')
        },

        deleteUser: function (id) {
            var self = this;
            this.store.find('user', id).then(function (user) {
                if (user.get('email') === self.get('confirmEmail')) {
                    user.destroyRecord().then(function () {
                        self.send('query');
                    });
                }
            }).finally(function () {
                self.set('confirmEmail', '')
            });
        },

        query: function () {
            if (!this.get('unfilteredModel')){
                this.set('unfilteredModel', this.get('model'));
            };

            var self = this;

            if (this.get('searchEmail') && this.get('searchEmail').length > 0){
                this.store
                    .query('user', {email: this.get('searchEmail')})
                    .then(function (model) {
                        self.set('model', model);
                    });
            } else {
                this.set('model', this.get('unfilteredModel'));
            }

        }
    }
});
