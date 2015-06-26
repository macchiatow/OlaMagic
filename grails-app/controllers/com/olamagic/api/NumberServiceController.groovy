package com.olamagic.api

import com.olamagic.Number

/**
 * Created by tmageramov on 26.06.2015.
 */
class NumberServiceController {

    static namespace = 'api'

    static responseFormats = ['json', 'xml']

    def save(Number numberInstance){
        if (numberInstance == null) {
            notFound()
            return
        }

        if (numberInstance.hasErrors()) {
            respond numberInstance.errors, view:'create'
            return
        }

        numberInstance.save flush:true

        respond numberInstance
    }
}
