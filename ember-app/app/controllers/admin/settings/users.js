import Ember from 'ember';

export default Ember.Controller.extend({

    userObject: {},

    actions: {

        createUser: function () {
            this.store.createRecord('user', this.get('userObject')).save();
            this.set('userObject', {});
        },

        updateUser: function (param) {
            param.save();
        },

        deleteUser: function (id) {
            var self = this;
            this.store.find('user', id).then(function (user) {
                if (user.get('email') === self.get('confirmEmail')){
                    user.destroyRecord();
                }
            }).finally(function(){
                self.set('confirmEmail', '')
            });
        }
    }
});
