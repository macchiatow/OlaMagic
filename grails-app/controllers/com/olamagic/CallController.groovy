package com.olamagic

import grails.converters.*

import static org.springframework.http.HttpStatus.CREATED

/**
 * Created by togrul on 6/26/15.
 */
class CallController {

    static responseFormats = ['json', 'xml']


    def index(){
        render Call.all as JSON
    }

    def notifyCall(Number numberInstance){
        respond numberInstance, [status: CREATED]
    }
}
