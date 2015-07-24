import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  duration: DS.attr('number'),
  aimed: DS.attr('boolean'),
  number: DS.belongsTo('number')
});
