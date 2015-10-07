package com.olamagic

import com.olamagic.report.ReportMapper
import grails.converters.JSON

class ReportController {

    def generate(Long rangeFrom, Long rangeTo) {
        def report = ReportMapper.resolve[params.type].generate(rangeFrom, rangeTo)
        render ([reports: [[id: params.type, a: report]]] as JSON)
    }

}