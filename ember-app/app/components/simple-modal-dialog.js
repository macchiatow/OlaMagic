import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        toggleModal: function () {
            this.toggleProperty('show');
        },

        save: function () {
            this.sendAction('save-action', '1234');
        }
    }
});
