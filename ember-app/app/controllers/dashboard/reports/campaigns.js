import Ember from 'ember';

export default Ember.Controller.extend({

    detalizationOptions: [
        {"id": 0, "option": "detalization: hours"},
        {"id": 1, "option": "detalization: days"},
        {"id": 2, "option": "detalization: weeks"},
        {"id": 3, "option": "detalization: months"}
    ],

    chartOptions: {
        datasetFill: false,
        bezierCurveTension: 0.2,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li style=\"color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    },

    _updateChart: function () {
        var self = this;
        self.store.query('report', {
                type: 'campaign',
                detalization: 'hours',
                rangeFrom: this.get('rangeFrom'),
                rangeTo: this.get('rangeTo')
            }).then(function (reports) {
                var tableData = [];
                var chartData = {
                    labels: reports.get('firstObject.a.x'),
                    datasets: []
                };

                for (var i = 0; i < reports.get('firstObject.a.y').length; i++) {
                    var color = self._random_color();
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

    _random_color: function () {
        function c() {
            return Math.floor(Math.random() * 256).toString(10)
        }

        return "rgba(" + [c(), c(), c(), 1].join(',') + ")";
    }

});
