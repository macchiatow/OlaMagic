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
        this.send('changeDetalization');
    },


    _random_color: function () {
        function c() {
            return Math.floor(Math.random() * 256).toString(10)
        }

        return "rgba(" + [c(), c(), c(), 1].join(',') + ")";
    },

    actions: {
        changeDetalization: function(rangeFrom, rangeTo) {
            var self = this;
            var color = "rgba(117, 25, 255,1)";
            self.store.query('report', {type: 2, rangeFrom: rangeFrom, rangeTo: rangeTo}).then(function (reports) {
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

        detalizeToday: function (){
            var dateBeginning = Math.floor( new Date().getTime() / (1000*60*60*24) ) * (1000*60*60*24);
            this._changeDetalization(dateBeginning, dateBeginning + 1000*60*60*24 - 1);
        },

        detalizeYesterday: function (){
            var dateBeginning = Math.floor( new Date().getTime() / (1000*60*60*24) ) * (1000*60*60*24) -  (1000*60*60*24);
            this._changeDetalization(dateBeginning, dateBeginning + 1000*60*60*24 - 1);
        },

        detalizeWeek: function (){
            var dateBeginning = Math.floor( new Date().getTime() / (1000*60*60*24) ) * (1000*60*60*24) -  (1000*60*60*24);
            this._changeDetalization(dateBeginning - (1000*60*60*24) * 6, dateBeginning + 1000*60*60*24 - 1);
        }
    },

    _changeDetalization: function(rangeFrom, rangeTo) {
        var self = this;
        var color = "rgba(117, 25, 255,1)";
        self.store.query('report', {type: 2, rangeFrom: rangeFrom, rangeTo: rangeTo}).then(function (reports) {
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
    }
});
