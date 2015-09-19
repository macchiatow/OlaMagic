export default {

    name: 'active-workspace',
    after: ['ember-data'],

    initialize: function (container, application) {
        application.inject('component', 'active-workspace', 'service:active-workspace');
        application.inject('controller', 'active-workspace', 'service:active-workspace');
        application.inject('route', 'active-workspace', 'service:active-workspace');
        application.inject('service:active-workspace', 'store', 'store:main');
    }

};