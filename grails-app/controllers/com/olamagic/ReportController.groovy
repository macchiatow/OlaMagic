package com.olamagic

import com.olamagic.report.ReportMapper
import grails.converters.JSON

class ReportController {

    def generate(Long rangeFrom, Long rangeTo, String detalization) {
        def report = ReportMapper.resolve[params.type].generate(rangeFrom, rangeTo, detalization)
        render ([reports: [[id: params.type, a: report]]] as JSON)
    }

}