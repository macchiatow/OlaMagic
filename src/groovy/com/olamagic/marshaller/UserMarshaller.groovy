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
                    email          : u.email,
                    id             : u.id,
                    accountExpired : u.accountExpired,
                    accountLocked  : u.accountLocked,
                    enabled        : u.enabled,
                    passwordExpired: u.passwordExpired,
                    authorities    : u.authorities*.authority,
                    workspaces     : u.profile.workspaces.id + u.profile.sharedWorkspaces.id
            ]
        }
    }
}
