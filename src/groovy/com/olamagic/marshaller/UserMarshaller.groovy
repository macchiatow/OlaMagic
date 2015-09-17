package com.olamagic.marshaller

import com.olamagic.auth.SecUser
import grails.converters.JSON

/**
 * Created by togrul on 7/29/15.
 */
class UserMarshaller {

    void register() {

        JSON.registerObjectMarshaller(SecUser) { SecUser u ->
            return [
                    id                    : u.profile.id,
                    email                 : u.email,
                    isAdmin               : u.admin,
                    enabled               : u.enabled,
                    accountExpired        : u.accountExpired,
                    accountLocked         : u.accountLocked,
                    passwordExpired       : u.passwordExpired,
                    workspacesOwning      : u.profile.workspacesOwning.id.sort { it },
                    workspacesContributing: u.profile.workspacesContributing.id.sort { it }
            ]
        }

    }
}
