import Ember from 'ember';

export default Ember.Component.extend({
    classNameBindings: ['navigatorVisible'],
    navigatorVisible: false,
    actions: {
        open() {
            this.toggleProperty('navigatorVisible');
        },

        signOut() {
            this.get('session').invalidate();
        },

        activateWorkspace(workspace) {
            this.get('active-workspace').activate(workspace);
            this.send('open');
        }
    }

});
