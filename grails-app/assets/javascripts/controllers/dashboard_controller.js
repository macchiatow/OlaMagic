/**
 * Created by togrul on 7/15/15.
 */

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