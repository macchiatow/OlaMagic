// For more information see: http://emberjs.com/guides/routing/

OlaMagic.Router.map(function() {
    this.route('dashboard', { path: '/dashboard/:uid' }, function() {
        this.route('pbx', function() {
            this.route('numbers', {path : '/numbers'});
        });
        this.route('reports', function() {
            this.route('report-one');
            this.route('report-two');
            this.route('report-three');
        });
        this.route('reports', function() {
            this.route('report-one');
            this.route('report-two');
            this.route('report-three');
        });
        this.route('analytics', function() {
            this.route('campaigns');
            this.route('adsources');
        });
        this.route('sites', {path : '/sitez'});
    });
});

OlaMagic.Router.reopen({
    location: 'auto'
});

OlaMagic.DashboardController = Ember.ObjectController.extend({
    isShowMissionControl: false,
    isShowSiteControl: false,
    currentSite: "Site...",
    actions: {
        showMissionControl: function () {
            this.set('isShowMissionControl', !this.isShowMissionControl);
        },
        showSiteControl: function () {
            this.set('isShowSiteControl', !this.isShowSiteControl);
        },
        selectSite: function (value) {
            this.set('currentSite', value);
            this.set('isShowSiteControl', false);
        }
    }
});


OlaMagic.DashboardPbxNumbers1Route = Ember.Route.extend({

});