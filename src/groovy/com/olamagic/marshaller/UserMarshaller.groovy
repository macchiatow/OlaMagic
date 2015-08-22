package com.olamagic.marshaller

import com.olamagic.auth.SecUser
import grails.converters.JSON

/**
 * Created by togrul on 7/29/15.
 */
class UserMarshaller {

    void register(){
        JSON.registerObjectMarshaller(SecUser) { SecUser u ->
            return [
                    id                      : u.profile.id,
                    email                   : u.email,
                    workspacesOwning        : u.profile.workspacesOwning.id.sort { it },
                    workspacesContributing  : u.profile.workspacesContributing.id.sort { it }
            ]
        }
    }
}
