OlaMagic.AdminNumbersController = Ember.Controller.extend({
    isEditing: false,

    actions: {
        edit: function () {
            this.set('isEditing', !this.isEditing);
        }
    }
});