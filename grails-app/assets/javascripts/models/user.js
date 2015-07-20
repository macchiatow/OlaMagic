/**
 * Created by togrul on 7/20/15.
 */
OlaMagic.User = DS.Model.extend({
    uid: DS.attr('string'),
    workplaces: DS.hasMany('workplace')
});