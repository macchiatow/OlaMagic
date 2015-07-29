package com.olamagic

import com.olamagic.auth.SecUser

/**
 * Created by tmageramov on 14.07.2015.
 */
class Profile {

    static belongsTo = [secUser: SecUser]

    static hasMany = [workplaces: Workspace]

    static constraints = {
      	workplaces minSize: 1
    }

    def beforeValidate() {
        if (workplaces == null) {
            workplaces = [new Workspace(owner: this)]
        }
    }

}
