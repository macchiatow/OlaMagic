package com.olamagic

import grails.converters.JSON

class ReportController {

    def generate() {
        def result = Call.executeQuery('select n.upid, a.name from Call c, AdSource a, Number n where c.number = n.id and n.adSource = a.id')
        render ([reports: [[id: 1, a: [result]]]] as JSON)
    }

}
