import Ember from 'ember';

export default Ember.Component.extend({
    fields: ['upid'],

    actions: {
        toggleModal: function () {
            this.toggleProperty('show');
        },

        save: function () {
            this.sendAction('save-action');
            this.toggleProperty('show');
        }
    }
});
