package com.olamagic.marshaller

import com.olamagic.Call
import grails.converters.JSON

/**
 * Created by togrul on 7/29/15.
 */
class CallMarshaller {

    void register(){
        JSON.registerObjectMarshaller(Call) {
            def properties = [:]

            properties << [id: it.id]
            properties << [date: it.date]
            properties << [duration: it.duration]
            properties << [upid: it.number.upid]

            return properties
        }
    }
}
