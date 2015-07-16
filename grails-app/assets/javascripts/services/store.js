OlaMagic.ApplicationStore = DS.Store.extend({
});

OlaMagic.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace : 'api',
    host : 'http://localhost:8080'

});
