import Ember from 'ember';

export default Ember.Service.extend({
    isAuthenticated: false,
    userId: null,
    user: null
});