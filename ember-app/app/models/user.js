import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr('string'),
    password: DS.attr('string'),
    isAdmin: DS.attr('boolean'),
    accountExpired: DS.attr('boolean'),
    accountLocked: DS.attr('boolean'),
    passwordExpired: DS.attr('boolean'),
    enabled:  DS.attr('boolean', {defaultValue: true}),
    workspacesOwning: DS.hasMany('workspace', { async: true, inverse: 'owner' }),
    workspacesContributing: DS.hasMany('workspace', { async: true, inverse: 'contributors'}),
    workspaces : Ember.computed.union('workspacesOwning', 'workspacesContributing')
});
