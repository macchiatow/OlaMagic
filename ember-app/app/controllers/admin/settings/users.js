import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {

        createUser: function () {
            this.store.createRecord('user',
                {email: this.get('email'),
                    password:this.get('password'),
                    isAdmin:this.get('isAdmin')}).save();
            this.set('email','');
            this.set('password','');
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
