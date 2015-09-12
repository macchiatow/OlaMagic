import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
    this.route('dashboard', function () {
        this.route('numbers');
        this.route('workspaces', function () {
            this.route('all', {path: '/all'});
            this.route('workspace', {path: '/:wid'});
        });
        this.route('reports', function () {
            this.route('report-one');
            this.route('report-two');
            this.route('report-three');
        });
        this.route('campaigns');
        this.route('adsources');
        this.route('analytics');
        this.route('sites');
    });
    this.route('admin', function () {
        this.route('settings', function () {
            this.route('numbers');
            this.route('users');
        })
    });
    this.route('login');
    this.route('authority-based-router');
});

export default Router;
