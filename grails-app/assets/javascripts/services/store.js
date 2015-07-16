OlaMagic.ApplicationStore = DS.Store.extend({
});

OlaMagic.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace : 'admin',
    host : 'http://localhost:8080'

});
