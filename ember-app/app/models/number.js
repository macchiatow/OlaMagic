import DS from 'ember-data';

export default DS.Model.extend({
    upid: DS.attr('string'),
    forwardTo: DS.attr('string'),
    owner: DS.belongsTo('workspace', {async: true})
});
