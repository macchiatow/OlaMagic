import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr(),
    workspaces: DS.hasMany('workspace', { async: true })
});
