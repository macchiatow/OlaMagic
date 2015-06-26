package com.olamagic.api

import com.olamagic.Call
import com.olamagic.Number

/**
 * Created by tmageramov on 26.06.2015.
 */
class CallServiceController {

    static namespace = 'api'

    static responseFormats = ['json', 'xml']

    def save(Call callInstance) {

        Number number = Number.findByUpid(callInstance.number.upid)

        if (callInstance == null || number == null) {
            notFound()
            return
        }

        callInstance.number = number

        callInstance.save flush: true

        respond callInstance
    }

}
