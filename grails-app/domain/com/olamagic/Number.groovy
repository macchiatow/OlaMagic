package com.olamagic

import com.olamagic.join.UserNumber

class Number {

    String upid

    static hasMany = [calls: Call]

    Set<Number> getAllAvailableNumbers(){
        Number.all.findAll { !UserNumber.all*.number.contains(it) }
    }



    static mapping = {
        unique:['upid']
    }

    static constraints = {
    }
}
