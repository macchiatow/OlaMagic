package com.olamagic

class Site {

    String name

    String details

    static hasMany = [adSources: AdSource, campaigns: Campaign]

    static belongsTo = [workspace: Workspace]

    static constraints = {
    }
}
