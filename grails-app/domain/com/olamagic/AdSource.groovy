package com.olamagic

class AdSource {

    String name

    Integer type

    static belongsTo = [site: Site]

    static hasMany = [numbers: Number]

    static constraints = {
    }
}
