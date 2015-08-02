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
            def properties = [:]

            properties << [id: u.id]
            properties << [upid: u.upid]
            if (u.workspace?.title){
                properties << [workspace: u.workspace?.title]
            }
            if (u.campaign?.description){
                properties << [campaign: u.campaign?.description]
            }

            return properties
        }
    }
}
