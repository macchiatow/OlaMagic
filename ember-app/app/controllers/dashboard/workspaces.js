import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        newWorkspace: function () {
            var mod = this.get('model');

            this.store.createRecord('workspace', {
                title: 'Rails is Omakase'
            }).save().then(function(m) {
                mod.addObject(m);
                console.log("Author name after: " + m.get("title"));
            });
        }
    }
});
