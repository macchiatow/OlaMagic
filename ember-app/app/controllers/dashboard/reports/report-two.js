import Ember from 'ember';

export default Ember.Controller.extend({

    chartOptions: {
        datasetFill: false,
        bezierCurveTension: 0.2,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li style=\"color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    },

    init: function () {
        var self = this;
        self.store.query('report', {type: 3}).then(function (reports) {
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
            }

            self.set('chartData', chartData)
            self.set('options', {
                datasetFill: false,
                bezierCurveTension: 0.2,
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li style=\"color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
            })


        });
    },

    _random_color: function () {
        function c() {
            return Math.floor(Math.random() * 256).toString(10)
        }

        return "rgba(" + [c(), c(), c(), 1].join(',') + ")";
    }

});
