package com.olamagic.marshaller

import com.olamagic.Call
import grails.converters.JSON

/**
 * Created by togrul on 7/29/15.
 */
class CallMarshaller {

    void register(){
        JSON.registerObjectMarshaller(Call) {
            return [
                    date: it.date,
                    duration: it.duration,
                    upid: it.number.upid]
        }
    }
}
