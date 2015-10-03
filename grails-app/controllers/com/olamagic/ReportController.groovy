package com.olamagic

import com.olamagic.report.ReportTypeResolver
import grails.converters.JSON

class ReportController {

    def generate() {
        def report = ReportTypeResolver.resolve[params.type].generate()
        render ([reports: [[id: params.type, a: report]]] as JSON)
    }

}