OlaMagic.AdminNumbersRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('number');
    }
});