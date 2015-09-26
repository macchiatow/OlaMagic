import Ember from 'ember';

export default Ember.Route.extend({

    model: function(params) {
        return this.store.find('adsource', params.aid);
    },

    renderTemplate: function() {
        this.render({ into: "dashboard" });
    }

});
