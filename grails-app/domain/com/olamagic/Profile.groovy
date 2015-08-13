package com.olamagic

import com.olamagic.auth.SecUser

/**
 * Created by tmageramov on 14.07.2015.
 */
class Profile {

    static belongsTo = [secUser: SecUser]

    static hasMany = [workspaces: Workspace, sharedWorkspaces: Workspace]

    static constraints = {
      	workspaces minSize: 1
    }

    def afterInsert() {
        Workspace.withNewSession{
            new Workspace(owner: this).save flush: true
        }
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