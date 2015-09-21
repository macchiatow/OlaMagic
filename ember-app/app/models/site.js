import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  workspace: DS.belongsTo('workspace'),
  adSources: DS.hasMany('adSource'),
  campaigns: DS.hasMany('campaign')
});
