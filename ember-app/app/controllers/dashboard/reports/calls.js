import Ember from 'ember';

export default Ember.Controller.extend({

    detalizationOptions: [
        {"id": 0, "option": "detalization: hours"},
        {"id": 1, "option": "detalization: days"},
        {"id": 2, "option": "detalization: weeks"},
        {"id": 3, "option": "detalization: months"}
    ],

    allCallsReport: function () {
        return this.store.query('report', {
            type: 'call',
            rangeFrom: this.get('rangeFrom'),
            rangeTo: this.get('rangeTo')
        });
    }.property('rangeFrom', 'rangeTo'),

    options: {
        datasetFill: false,
        bezierCurveTension: 0.3,
        pointHitDetectionRadius : 4,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    },

    actions: {

        detalizeToday: function () {
            this.set('rangeFrom', Date.today().getTime());
            this.set('rangeTo', Date.today().addDays(1).getTime());
            this.set('detalization', 'hours');

            this._updateChart();
        },

        detalizeYesterday: function () {
            this.set('rangeFrom', Date.today().addDays(-1).getTime());
            this.set('rangeTo', Date.today().getTime());
            this.set('detalization', 'hours');

            this._updateChart();
        },

        detalizeWeek: function () {
            this.set('rangeFrom', Date.today().addWeeks(-1).addDays(1).getTime());
            this.set('rangeTo', Date.today().addDays(1).getTime());
            this.set('detalization', 'days');

            this._updateChart();
        },

        detalizeMonth: function () {
            this.set('rangeFrom', Date.today().addMonths(-1).getTime());
            this.set('rangeTo', Date.today().addDays(1).getTime());
            this.set('detalization', 'weeks');

            this._updateChart();
        },

        detalizeYear: function () {
            this.set('rangeFrom', Date.today().addYears(-1).getTime());
            this.set('rangeTo', Date.today().addDays(1).getTime());
            this.set('detalization', 'weeks');

            this._updateChart();
        }
    },

    _updateChart: function () {
        var self = this;
        this.set('data', undefined);
        this.store.query('report', {
            type: "call",
            detalization: this.get('detalization'),
            rangeFrom: this.get('rangeFrom'),
            rangeTo: this.get('rangeTo')
        }).then(function (reports) {
            self.set('data', {
                labels: reports.get('firstObject.a.x'),
                datasets: [{
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    strokeColor: "#79589F",
                    pointColor: "#79589F",
                    data: reports.get('firstObject.a.y')
                }]
            })
        })
    }
});
