import Ember from 'ember';

export default Ember.Component.extend({
    classNameBindings: ['navigatorVisible'],
    navigatorVisible: false,
    actions: {
        open() {
            this.toggleProperty('navigatorVisible');
        },
        signout() {
            this.sendAction('action');
        }
    }

});
