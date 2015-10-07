import Ember from 'ember';

export default Ember.Controller.extend({

    detalizationOptions: [
        {"id":0, "option":"detalization: hours"},
        {"id":1, "option":"detalization: days"},
        {"id":2, "option":"detalization: weeks"},
        {"id":3, "option":"detalization: months"}
    ],

    report: function () {
        return this.get('model.firstObject.a');
    }.property('model'),

    options: {
        datasetFill: false,
        bezierCurve: false,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    },

    data: {},

    init: function () {
        this._changeDetalization();
    },

    actions: {

        detalizeToday: function (){
            this._changeDetalization(Date.today().getTime(), Date.today().addDays(1).getTime());
        },

        detalizeYesterday: function (){
            this._changeDetalization(Date.today().addDays(-1).getTime(), Date.today().getTime());
        },

        detalizeWeek: function (){
            this._changeDetalization(Date.today().addWeeks(-1).addDays(1).getTime(), Date.today().addDays(1).getTime());
        },

        detalizeMonth: function (){
            this._changeDetalization(Date.today().addMonths(-1).getTime(), Date.today().addDays(1).getTime());
        }
    },

    _changeDetalization: function(rangeFrom, rangeTo) {
        var self = this;
        self.store.query('report', {type: "call", rangeFrom: rangeFrom, rangeTo: rangeTo}).then(function (reports) {
            self.set('data', {
                labels: reports.get('firstObject.a.x'),
                datasets: [{
                    strokeColor: "rgba(117, 25, 255,1)",
                    pointColor: "rgba(117, 25, 255,1)",
                    data: reports.get('firstObject.a.y')
                }]
            })
        })
    }
});
