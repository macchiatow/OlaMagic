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
            def properties = [
                    id: u.id,
                    upid: u.upid,
                    forwardTo: u.forwardTo?:'']

            if (u.workspace?.title){
                properties << [workspace: u.workspace.title]
            }
            if (u.campaign?.name){
                properties << [campaign: u.campaign.name]
            }
            if (u.adSource?.name){
                properties << [adSource: u.adSource.name]
            }

            return properties
        }
    }
}
