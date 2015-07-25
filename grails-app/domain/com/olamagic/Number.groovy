package com.olamagic

import com.olamagic.join.UserNumber

class Number {

    String upid

    static hasMany = [calls: Call]

    static transients = ['calls']

    Set<Number> getAllAvailableNumbers(){
        Number.all.findAll { !UserNumber.all*.number.contains(it) }
    }

    static mapping = {
    }

    static constraints = {
        upid unique: true
    }
}
