/**
 * Created by togrul on 7/20/15.
 */
OlaMagic.Call = DS.Model.extend({
    date: DS.attr('date'),
    duration: DS.attr('number'),
    aimed: DS.attr('boolean'),
    number: DS.belongsTo('number')
});