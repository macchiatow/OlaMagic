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
        var workspaceResolved;
        var siteResolved;

        const self = this;

        if (localStorage.getItem('/workspace/id')) {
            workspaceResolved = this.get('store').find('workspace', localStorage.getItem('/workspace/id'));
        } else {
            workspaceResolved = this.get('store').find('user', JSON.parse(localStorage.getItem('ember_simple_auth:session')).secure.account.id)
                .then(function (user) {
                    return self.get('store').find('workspace', user.get('workspaces.firstObject.id'));
                });
        }

        workspaceResolved.then(function (workspace) {
            self.activate(workspace);
        });


        if (localStorage.getItem('/site/id')) {
            siteResolved = this.get('store').find('site', localStorage.getItem('/site/id'));
        } else {
            siteResolved = workspaceResolved.then(function (workspace) {
                return self.get('store').find('site', workspace.get('sites.firstObject.id'));
            });
        }

        siteResolved.then(function (site) {
            self.activateSite(site);
        });

    }

});