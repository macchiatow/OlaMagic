import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    console.log(params);
    return null; //this.store.query('workspace', {user: ':uid'});
  }

});
