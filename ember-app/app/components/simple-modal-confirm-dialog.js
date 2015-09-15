import Ember from 'ember';

export default Ember.Component.extend({

    actions: {
        toggleModal: function () {
            this.toggleProperty('show');
        },

        confirm: function () {
            this.sendAction('confirm-action', this.get('confirm-action-param'));
            this.toggleProperty('show');
        }
    }

});
