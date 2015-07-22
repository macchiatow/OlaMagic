import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
  	  	console.log('dash pbx numbers');
    return this.store.findAll('number');
  }
});
