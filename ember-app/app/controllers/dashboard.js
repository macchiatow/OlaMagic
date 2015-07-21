import Ember from 'ember';

export default Ember.Controller.extend({
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
