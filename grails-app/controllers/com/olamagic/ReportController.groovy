package com.olamagic

import com.olamagic.report.ReportTypeResolver
import grails.converters.JSON

class ReportController {

    def generate() {
        def report = ReportTypeResolver.resolve[1].generate()
        render ([reports: [[id: 1, a: report]]] as JSON)
    }

}