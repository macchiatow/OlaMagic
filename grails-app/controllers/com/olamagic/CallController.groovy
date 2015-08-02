package com.olamagic

import grails.converters.JSON

import static org.springframework.http.HttpStatus.ACCEPTED
import static org.springframework.http.HttpStatus.NOT_FOUND

/**
 * Created by togrul on 6/26/15.
 */
class CallController {

    static responseFormats = ['json']

    def create(){
        def call = new Call(request.JSON.call)
        def number = Number.findByUpid(request.JSON.call.number.upid)

        if (number == null) {
            render status: NOT_FOUND
            return
        }

        call.number = number
        call.save flush: true, failOnError: true

        render ([call: call] as JSON)
    }

    def list(String upid){
        def number = Number.findByUpid(upid)

        if (number == null) {
            render status: NOT_FOUND
            return
        }

        def calls = Call.findAllByNumber(number)
        render ([calls: calls] as JSON)
    }

    def clear(String upid){
        Call.findAllByNumber(Number.findByUpid(upid))*.delete flush: true

        render status: ACCEPTED
    }
}
