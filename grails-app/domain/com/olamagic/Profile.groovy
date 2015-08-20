package com.olamagic

import com.olamagic.auth.SecUser

/**
 * Created by tmageramov on 14.07.2015.
 */
class Profile {

    static belongsTo = [secUser: SecUser]

    static hasMany = [workspaces: Workspace]

    static constraints = {
      	workspaces minSize: 1
    }

    boolean equals(o) {
        if (this.is(o)) return true
        if (getClass() != o.class) return false

        Profile profile = (Profile) o

        if (secUser != profile.secUser) return false

        return true
    }

    int hashCode() {
        return secUser.hashCode()
    }

}