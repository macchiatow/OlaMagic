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
