import Ember from 'ember';

export default Ember.Controller.extend({
    navigatorVisible: "",
    siteSectionVisible: "",
    currentSite: "Site...",
    
    actions: {
        showMissionControl: function () {
            this.set('navigatorVisible', (this.navigatorVisible === "") ? "navigator-visible" : "");
        },
        
        showSiteControl: function () {
            this.set('siteSectionVisible', (this.siteSectionVisible === "") ? "open" : "");
        },
        
        selectSite: function (value) {
          this.set('currentSite', value);
          this.set('isShowSiteControl', false);
        },

        invalidate: function() {
            this.get('session').invalidate();
            this.set('navigatorVisible', "");
        }
    }
});
