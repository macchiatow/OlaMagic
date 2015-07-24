import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  sites: DS.hasMany('site'),
  owner: DS.belongsTo('user'),
  myNumber: DS.hasMany('number')
});
