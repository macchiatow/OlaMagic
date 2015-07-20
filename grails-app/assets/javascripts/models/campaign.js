/**
 * Created by togrul on 7/20/15.
 */
OlaMagic.Campaign = DS.Model.extend({
    name: DS.attr('string'),
    details: DS.attr('string'),
    site: DS.belongsTo('site'),
    number: DS.hasMany('number')
});