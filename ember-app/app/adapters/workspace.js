import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
    namespace: 'api/users',
    host: config.API_HOST,
    uid: '',
    model: 'workspaces',
    urlForQuery: function(query, modelName){
        var url = [this.host, this.namespace, query.user, Ember.String.pluralize(modelName)];
        this.uid = query.user;
        delete query.user;

        url = url.join('/');
        if (!this.host && url && url.charAt(0) !== '/') {
            url = '/' + url;
        }

        return url;
    },
    urlForCreateRecord: function (modelName, snapshot) {
        var host =  Ember.get(this, 'host');
        var namespace =  Ember.get(this, 'url');
        console.log(host);
        console.log(this.uid);

        return this.host + '/' + this.namespace + '/' + this.uid + '/' + this.model
    },
    urlForDeleteRecord: function (id, modelName) {
        var host =  Ember.get(this, 'host');
        var namespace =  Ember.get(this, 'url');

        return this.host + '/' + 'api' + '/' + this.model + '/' + id;
    },
    urlForFindRecord: function (id, modelName) {
        var host =  Ember.get(this, 'host');
        var namespace =  Ember.get(this, 'url');

        return this.host + '/' + 'api' + '/' + this.model + '/' + id;
    }
});
