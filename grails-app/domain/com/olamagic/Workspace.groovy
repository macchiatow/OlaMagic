package com.olamagic

/**
 * Created by togrul on 7/10/15.
 */
class Workspace {

    String title

    static hasOne = [owner: Profile]

    static belongsTo = Profile

    static hasMany = [myNumbers: Number, sites: Site, contributors: Profile]

}
