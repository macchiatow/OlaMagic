export default Ember.Service.extend({

    activate(workspace) {
        localStorage.setItem('/workspace/id', workspace.id)
        this.set('workspace', workspace);
    },

    init: function () {
        this._super();
        const self = this;
        if (localStorage.getItem('/workspace/id')) {
            this.get('store').find('workspace', localStorage.getItem('/workspace/id'))
                .then(function (workspace) {
                    self.set('workspace', workspace);
                })
        }
    }
});