package com.olamagic.marshaller

import com.olamagic.Number
import com.olamagic.Site
import grails.converters.JSON

/**
 * Created by togrul on 7/29/15.
 */
class SiteMarshaller {

    void register(){
        JSON.registerObjectMarshaller(Site) { Site s ->
            return [
            		id				: s.id,
                    name       		: s.name,
            ]
        }
    }
}
