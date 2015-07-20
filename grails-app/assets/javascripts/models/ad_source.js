/**
 * Created by togrul on 7/20/15.
 */
OlaMagic.AdSource = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    site: DS.belongsTo('site')
});