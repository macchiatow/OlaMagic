import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {

        createUser: function () {
            this.store.createRecord('user',
                {email: this.get('email'), password:this.get('password')})
                .save();
            this.set('email','');
            this.set('password','');
        },

        deleteUser: function (id) {
            this.store.findRecord('user', id).then(function (user) {
                user.destroyRecord();
            });
        }
    }
});
