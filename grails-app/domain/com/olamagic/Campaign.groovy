package com.olamagic

class Campaign {

    String name

    static belongsTo = [site: Site]

    static hasMany = [numbers: Number]

    static constraints = {
    }
}
