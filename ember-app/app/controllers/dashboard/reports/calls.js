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
        var color = "rgba(117, 25, 255,1)";
        self.store.query('report', {type: 2}).then(function (reports) {
            self.set('data', {
                labels: reports.get('firstObject.a.x'),
                datasets: [{
                        label: "My First dataset",
                        strokeColor: color,
                        pointColor: color,
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: reports.get('firstObject.a.y')
                    }]
            })
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
