import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
    namespace: 'api/users',
    host: config.API_HOST,
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
