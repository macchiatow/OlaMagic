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
            detalization: 'none',
            rangeFrom: this.get('rangeFrom'),
            rangeTo: this.get('rangeTo')
        });
    }.property('rangeFrom', 'rangeTo'),

    options: {
        datasetFill: false,
        bezierCurve: false,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    },

    actions: {

        detalizeToday: function () {
            this.set('rangeFrom', Date.today().getTime());
            this.set('rangeTo', Date.today().addDays(1).getTime());
            this.set('detalization', 'hour');

            this._updateChart();
        },

        detalizeYesterday: function () {
            this.set('rangeFrom', Date.today().addDays(-1).getTime());
            this.set('rangeTo', Date.today().getTime());
            this.set('detalization', 'hour');

            this._updateChart();
        },

        detalizeWeek: function () {
            this.set('rangeFrom', Date.today().addWeeks(-1).addDays(1).getTime());
            this.set('rangeTo', Date.today().addDays(1).getTime());
            this.set('detalization', 'day');

            this._updateChart();
        },

        detalizeMonth: function () {
            this.set('rangeFrom', Date.today().addMonths(-1).getTime());
            this.set('rangeTo', Date.today().addDays(1).getTime());
            this.set('detalization', 'day');

            this._updateChart();
        },

        detalizeYear: function () {
            this.set('rangeFrom', Date.today().addYears(-1).getTime());
            this.set('rangeTo', Date.today().addDays(1).getTime());
            this.set('detalization', 'month');

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
                    strokeColor: "rgba(117, 25, 255,1)",
                    pointColor: "rgba(117, 25, 255,1)",
                    data: reports.get('firstObject.a.y')
                }]
            })
        })
    }
});
