import Ember from 'ember';

export default Ember.Controller.extend({
  navigatorVisible: "",
  isShowSiteControl: false,
  currentSite: "Site...",
  actions: {
      showMissionControl: function () {
          this.set('navigatorVisible', (this.navigatorVisible == "") ? "navigator-visible" : "");
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
