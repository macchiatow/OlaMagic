/**
 * Created by togrul on 7/15/15.
 */
OlaMagic.Site = DS.Model.extend({
    name: DS.attr('string'),
    details: DS.attr('string'),
    workspace: DS.belongsTo('workspace'),
    adSources: DS.hasMany('adSource'),
    campaigns: DS.hasMany('campaign')
});

OlaMagic.Workspace = DS.Model.extend({
    title: DS.attr('string'),
    sites: DS.hasMany('site'),
    owner: DS.belongsTo('user'),
    myNumber: DS.hasMany('number')
});

OlaMagic.Number = DS.Model.extend({
    upid: DS.attr('string')
});

OlaMagic.User = DS.Model.extend({
    uid: DS.hasMany('workspace'),
    workplaces: DS.hasMany('workplace')
});

OlaMagic.AdSource = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    site: DS.belongsTo('site')
});

OlaMagic.Campaign = DS.Model.extend({
    name: DS.attr('string'),
    details: DS.attr('string'),
    site: DS.belongsTo('site'),
    number: DS.hasMany('number')
});

OlaMagic.Call = DS.Model.extend({
    date: DS.attr('date'),
    duration: DS.attr('number'),
    aimed: DS.attr('boolean'),
    number: DS.belongsTo('number')
});
