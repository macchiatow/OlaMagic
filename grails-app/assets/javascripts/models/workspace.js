/**
 * Created by togrul on 7/20/15.
 */
OlaMagic.Workspace = DS.Model.extend({
    title: DS.attr('string'),
    sites: DS.hasMany('site'),
    owner: DS.belongsTo('user'),
    myNumber: DS.hasMany('number')
});