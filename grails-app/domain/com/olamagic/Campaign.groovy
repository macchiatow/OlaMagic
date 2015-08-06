package com.olamagic

class Campaign {

    String name

    String description

    static belongsTo = [site: Site]

    static hasMany = [numbers: Number]

    static constraints = {
    }
}
