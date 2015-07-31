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

    def beforeValidate() {
        if (workspaces == null || workspaces == []) {
            workspaces = [new Workspace(owner: this)]
        }
    }

}
