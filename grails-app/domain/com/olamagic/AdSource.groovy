package com.olamagic

class AdSource {

    String name

    String description

    static belongsTo = [site: Site]

    static hasMany = [number: Number]

    static constraints = {
    }
}
