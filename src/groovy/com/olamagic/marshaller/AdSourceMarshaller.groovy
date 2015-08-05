package com.olamagic.marshaller

import com.olamagic.AdSource
import com.olamagic.Site
import grails.converters.JSON

/**
 * Created by togrul on 8/6/15.
 */
class AdSourceMarshaller {

    void register(){
        JSON.registerObjectMarshaller(AdSource) { AdSource a ->
            return [
                    id				: a.id,
                    description     : a.description,
                    name       		: a.name,
                    numbers         : a.numbers?.upid?: []
            ]
        }
    }
}
