package com.olamagic

import grails.converters.JSON

class ReportController {

    def generate(){
        render ([report: [id: 1, a: []]] as JSON)
    }

}
