import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  workspace: DS.belongsTo('workspace'),
  adsources: DS.hasMany('adsource', { async: true }),
  campaigns: DS.hasMany('campaign', { async: true })
});
