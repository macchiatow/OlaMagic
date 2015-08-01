package com.olamagic.marshaller

import com.olamagic.Number
import com.olamagic.Workspace
import grails.converters.JSON

/**
 * Created by togrul on 7/29/15.
 */
class NumberMarshaller {

    void register(){
        JSON.registerObjectMarshaller(Number) { Number u ->
            return [
                    id  : u.id,
                    upid: u.upid,
                    workspace: u.workspace?.title?: '',
                    adSource: u.adSource?.description?: '',
                    campaign: u.campaign?.description?: ''
            ]
        }
    }
}
