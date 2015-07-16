OlaMagic.AdminNumbersController = Ember.ArrayController.extend({
    isEditing: false,

    actions: {
        edit: function () {
            this.set('isEditing', !this.isEditing);
        }
    }
});