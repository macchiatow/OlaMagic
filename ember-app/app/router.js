import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('dashboard', {path: '/dashboard'}, function () {
    this.route('workspaces', function () {
      this.route('settings');
      this.route('access');
    });
  });

  this.route('dashboard', {path: '/dashboard/:uid'}, function () {
    this.route('pbx', function () {
      this.route('numbers', {path: '/numbers'});
    });
    this.route('reports', function () {
      this.route('report-one');
      this.route('report-two');
      this.route('report-three');
    });
    this.route('analytics', function () {
      this.route('campaigns');
      this.route('adsources');
    });
    this.route('sites', {path: '/sitez'});
  });
  this.route('admin', function () {
    this.route('numbers');
    this.route('users');
  });
  this.route('admin-numbers');
  this.route('admin-users');
  this.route('dashboard-pbx-numbers');
});

export default Router;
