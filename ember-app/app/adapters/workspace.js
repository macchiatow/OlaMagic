import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    namespace : 'api/users',
    host : 'http://localhost:8080',

    urlForQuery: function(query, modelName){
        var url = [this.host, this.namespace, query.user, Ember.String.pluralize(modelName)];
        delete query.user;

        url = url.join('/');
        if (!this.host && url && url.charAt(0) !== '/') {
            url = '/' + url;
        }

        return url;
    }
});
