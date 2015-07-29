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

    static {
        JSON.registerObjectMarshaller(Workspace) { Workspace w ->
            return [
                    id  : w.id,
                    title: w.title
            ]
        }
    }
}
