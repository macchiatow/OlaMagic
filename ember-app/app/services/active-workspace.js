export default Ember.Service.extend({

    activate(workspace) {
        localStorage.setItem('/workspace/id', workspace.id);
        this.set('workspace', workspace);
    },

    activateSite(site) {
        localStorage.setItem('/site/id', site.id);
        this.set('activeSite', site);
    },

    clean() {
        localStorage.removeItem('/workspace/id');
        localStorage.removeItem('/site/id');
        this._reset();
    },

    init: function () {
        this._super();
        this._reset();
    },

    _reset() {
        const self = this;
        if (localStorage.getItem('/workspace/id')) {
            this.get('store').find('workspace', localStorage.getItem('/workspace/id'))
                .then(function (workspace) {
                    self.activate(workspace);
                })
        } else {
            this.get('store').find('user', JSON.parse(localStorage.getItem('ember_simple_auth:session')).secure.account.id)
                .then(function (user) {
                    return self.get('store').find('workspace', user.get('workspaces.firstObject.id'));
                }).then(function(workspace){
                    self.activate(workspace);
                });
        };

        if (localStorage.getItem('/site/id')) {
            this.get('store').find('site', localStorage.getItem('/site/id'))
                .then(function (site) {
                    self.activateSite(site);
                })
        } else {
            this.activateSite(this.get('workspace.sites.firstObject'));
        }
    }

});