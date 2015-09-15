import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr(),
    isAdmin: DS.attr(),
    workspacesOwning: DS.hasMany('workspace', { async: true, inverse: 'owner' }),
    workspacesContributing: DS.hasMany('workspace', { async: true, inverse: 'contributors'}),
    workspaces : Ember.computed.union('workspacesOwning', 'workspacesContributing')
});
