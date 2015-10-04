import Ember from 'ember';

export default Ember.Controller.extend({

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
        var self = this;
        self.store.query('report', {type: 3}).then(function (reports) {
            var parsed = {
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
                parsed.datasets.push(line);
            }

            self.set('data', parsed)
        })
    },


    _random_color: function () {
        function c() {
            return Math.floor(Math.random() * 256).toString(10)
        }

        return "rgba(" + [c(), c(), c(), 1].join(',') + ")";
    },

    actions: {}
});
