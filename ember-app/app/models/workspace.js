import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  owner: DS.attr('string'),
  contributors: DS.attr('string'),
  numbersCount: DS.attr('number'),
  sitesCount: DS.attr('number'),
  adSourcesCount: DS.attr('number'),
  campaignsCount: DS.attr('number')
});
