package com.olamagic

class Site {

    String name

    static hasMany = [adSources: AdSource, campaigns: Campaign]

    static belongsTo = [workspace: Workspace]

}
