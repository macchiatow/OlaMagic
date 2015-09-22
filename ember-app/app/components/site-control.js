import Ember from 'ember';

export default Ember.Component.extend({
    openClassBinding: function() {
        return this.get('open')?'open':'';
    }.property('open'),

    activeSite: function() {
        return this.get('active-workspace.activeSite');
    }.property('active-workspace.activeSite'),

    actions: {
        open() {
            this.toggleProperty('open');
        },

        selectSite: function (site) {
            this.set('selectedSite', site);
            this.toggleProperty('open');
            this.get('active-workspace').activateSite(site);
        }
    }

});
