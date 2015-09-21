import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    owner: DS.belongsTo('user', { async: true }),
    contributors: DS.hasMany('user', { async: true }),
    numbers: DS.hasMany('number', { async: true }),
    sites: DS.hasMany('site', { async: true }),
    numbersCount: DS.attr('number'),
    sitesCount: DS.attr('number'),
    adSourcesCount: DS.attr('number'),
    campaignsCount: DS.attr('number')
});
