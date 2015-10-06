package com.olamagic.report

import grails.converters.JSON

/**
 * Created by togrul on 10/6/15.
 */
class CallReport {

    def generate() {
        def report = ReportMapper.resolve[params.type].generate()
        render ([reports: [[id: params.type, a: report]]] as JSON)
    }
}
