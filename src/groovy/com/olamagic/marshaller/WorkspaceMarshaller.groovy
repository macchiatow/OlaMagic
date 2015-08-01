package com.olamagic.marshaller

import com.olamagic.Workspace
import grails.converters.JSON

/**
 * Created by togrul on 7/29/15.
 */
class WorkspaceMarshaller {

    void register(){
        JSON.registerObjectMarshaller(Workspace) { Workspace w ->
            return [
                    id  : w.id,
                    title: w.title,
                    owner: w.owner.secUser.email,
                    contributors : w.contributors?.secUser?.email?: []
            ]
        }
    }
}
