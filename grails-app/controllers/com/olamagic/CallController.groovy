package com.olamagic

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.ACCEPTED

/**
 * Created by togrul on 6/26/15.
 */
class CallController {

    static responseFormats = ['json', 'xml']

    def notifyCall(Call callInstance){
        callInstance.number = Number.findByUpid(callInstance.number.upid)

        callInstance.save flush: true

        respond callInstance, [status: CREATED]
    }

    def all(Integer max){
        params.max = Math.min(max ?: 10, 100)
        respond Call.list(params), model:[numberInstanceCount: Number.count()]
    }

    def allWithUpid(String upid){
        def calls = Call.findAllByNumber(Number.findByUpid(upid))
        println calls

        respond calls, model:[callInstanceCount: calls.size()]
    }

    def deleteWithUpid(String upid){
        Call.findAllByNumber(Number.findByUpid(upid))*.delete flush: true

        render status: ACCEPTED
    }
}
