import Ember from 'ember';

export default Ember.Component.extend({

    actions: {
        toggleModal: function () {
            this.toggleProperty('show');
        },

        save: function () {
            this.sendAction('save-action', this.get('param'));
            this.toggleProperty('show');
        },

        rollback: function () {
            this.sendAction('rollback-action', this.get('param'));
            this.toggleProperty('show');
        }
    }
});
