import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr(),
    workspacesOwning: DS.hasMany('workspace', { async: true, inverse: 'owner' }),
    workspacesContributing: DS.hasMany('workspace', { async: true, inverse: 'contributors'}),
    workspaces : Ember.computed.union('workspacesOwning', 'workspacesContributing')
});
