import Ember from 'ember';

export default Ember.Controller.extend({

    detalizationOptions: [
        {"id": 0, "option": "detalization: hours", value: "hours"},
        {"id": 1, "option": "detalization: days", value: "days"},
        {"id": 2, "option": "detalization: weeks", value: "weeks"},
        {"id": 3, "option": "detalization: months", value: "months"}
    ],

    colors: [
        "rgba(100,149,237,1)",
        "rgba(205,133,63,1)",
        "rgba(50,205,50,1)",
        "rgba(0,0,255,1)",
        "rgba(255,255,0,1)",
        "rgba(0,255,255,1)",
        "rgba(255,0,255,1)",
        "rgba(128,128,128,1)",
        "rgba(128,0,0,1)",
        "rgba(128,128,0,1)",
        "rgba(0,128,0,1)",
        "rgba(128,0,128,1)",
        "rgba(0,128,128,1)",
        "rgba(0,0,128,1)"
    ],

    chartOptions: {
        datasetFill: false,
        bezierCurveTension: 0.3,
        pointHitDetectionRadius : 4,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li style=\"color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    },

    _updateChart: function () {
        var self = this;
        this.set('chartData', undefined);
        self.store.query('report', {
                type: 'campaign',
                detalization: this.get('detalizationOption'),
                rangeFrom: this.get('rangeFrom'),
                rangeTo: this.get('rangeTo')
            }).then(function (reports) {
                var tableData = [];
                var chartData = {
                    labels: reports.get('firstObject.a.x'),
                    datasets: []
                };

                for (var i = 0; i < reports.get('firstObject.a.y').length; i++) {
                    var color = self.get('colors').get(i);
                    var lineData = reports.get('firstObject.a.y')[i];
                    var line = {
                        label: lineData[0],
                        strokeColor: color,
                        pointColor: color,
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: lineData[1]
                    };

                    chartData.datasets.push(line);
                    tableData.push({campaign: lineData[0], count: eval(lineData[1].join('+'))});
                }

                self.set('chartData', chartData);
                self.set('tableData', tableData)
            });
    },

    actions: {

        detalizeToday: function () {
            this.set('rangeFrom', Date.today().getTime());
            this.set('rangeTo', Date.today().addDays(1).getTime());

            this._updateChart();
        },

        detalizeYesterday: function () {
            this.set('rangeFrom', Date.today().addDays(-1).getTime());
            this.set('rangeTo', Date.today().getTime());

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

            this._updateChart();
        },

        detalizeYear: function () {
            this.set('rangeFrom', Date.today().addYears(-1).getTime());
            this.set('rangeTo', Date.today().addDays(1).getTime());

            this._updateChart();
        }
    }

});
