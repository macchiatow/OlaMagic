import Ember from 'ember';

export default Ember.Component.extend({
    openClassBinding: function() {
        return this.get('open')?'open':'';
    }.property('open'),

    actions: {
        open() {
            this.toggleProperty('open');
        },

        selectSite: function (site) {
            this.set('selectedSite', site);
            this.toggleProperty('open');
        }
    }

});
