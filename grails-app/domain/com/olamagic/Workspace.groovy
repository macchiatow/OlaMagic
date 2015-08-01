package com.olamagic

import grails.converters.JSON

/**
 * Created by togrul on 7/10/15.
 */
class Workspace {

    String title = 'My workspace'

    static hasOne = [owner: Profile]

    static belongsTo = Profile

    static hasMany = [myNumbers: Number, sites: Site, contributors: Profile]

    boolean equals(o) {
        if (this.is(o)) return true
        if (getClass() != o.class) return false

        Workspace workspace = (Workspace) o

        if (id != workspace.id) return false
        if (title != workspace.title) return false

        return true
    }

    int hashCode() {
        int result
        result = title.hashCode()
        result = 31 * result + (id != null ? id.hashCode() : 0)
        return result
    }
}
