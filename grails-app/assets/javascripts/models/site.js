/**
 * Created by togrul on 7/20/15.
 */
OlaMagic.Site = DS.Model.extend({
    name: DS.attr('string'),
    details: DS.attr('string'),
    workspace: DS.belongsTo('workspace'),
    adSources: DS.hasMany('adSource'),
    campaigns: DS.hasMany('campaign')
});