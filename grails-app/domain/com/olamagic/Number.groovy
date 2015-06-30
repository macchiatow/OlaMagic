package com.olamagic

import com.olamagic.join.UserNumber

class Number {

    String upid

    static hasMany = [call: Call]

    Set<Number> getAllAvailableNumbers(){
        Number.all.findAll { !UserNumber.all*.number.contains(it) }
    }

    static constraints = {
    }
}
