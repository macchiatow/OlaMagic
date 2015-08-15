import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
    namespace: 'api/users',
    host: config.API_HOST,
    uid: '',
    model: 'users',

    urlForFindRecord: function (id, modelName) {
        var host =  Ember.get(this, 'host');
        var namespace =  Ember.get(this, 'url');

        return this.host + '/' + 'api' + '/' + this.model + '/' + id + '/' + 'lookup';
    }
});
