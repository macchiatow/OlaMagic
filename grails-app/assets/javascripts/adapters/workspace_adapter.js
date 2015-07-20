OlaMagic.WorkspaceAdapter = DS.RESTAdapter.extend({
    namespace : 'api',
    host : 'http://localhost:8080/',
    urlForQuery: function(query, modelName){
        console.log('hihi');

        var url = ['api','users', query.user, modelName+'s'];
        delete query.user;
        var host = 'http://localhost:8080/';
        var prefix = this.urlPrefix();

        url = url.join('/');
        if (!host && url && url.charAt(0) !== '/') {
            url = '/' + url;
        }
        console.log(host+url);

        return host+url;
    }

});