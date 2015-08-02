package com.olamagic

class Call {

    Date date = new Date()
    Long duration = 0
    Boolean aimed

    static belongsTo = [number:Number]

    static constraints = {
        aimed nullable: true
    }
}
