package com.olamagic

class Number {

    String upid

    static hasMany = [calls: Call]

    static hasOne = [workspace: Workspace, adSource: AdSource, campaign: Campaign]

    static transients = ['calls']

    static mapping = {
    }

    static constraints = {
        upid unique: true
    }
}
