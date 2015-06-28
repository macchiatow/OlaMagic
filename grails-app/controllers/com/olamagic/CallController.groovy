package com.olamagic

import grails.converters.*
/**
 * Created by togrul on 6/26/15.
 */
class CallController {

    static responseFormats = ['json', 'xml']


    def index(){
        render Call.all as JSON
    }
}
