package com.olamagic

import grails.converters.JSON

/**
 * Created by togrul on 7/10/15.
 */
class Workspace {

    String title = "Workspace ${10000 + new Random().nextInt(89999)}"

    static hasOne = [owner: Profile]

    static hasMany = [myNumbers: Number, sites: Site]

    Set<Profile> getContributors() {
        WorkspaceContributor.findAllByWorkspace(this)*.profile
    }

}
