import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
    namespace: 'api',
    host: config.API_HOST,
    ajax: function(url, method, hash) {
        hash.crossDomain = true;
        hash.xhrFields = {withCredentials: false};
        return this._super(url, method, hash);
    }
});