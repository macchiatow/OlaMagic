package com.olamagic

import com.olamagic.auth.SecUser
import com.olamagic.join.UserNumber
import grails.converters.JSON


import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class NumberController {

    //static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    static responseFormats = ['json']

    def show(String upid){
        def instance =  Number.findByUpid(upid)

        if (instance == null) {
            respond status: NOT_FOUND
            return
        }

        respond instance
    }

    def list(Integer max){
        params.max = Math.min(max ?: 10, 100)
        render ([numbers: Number.list(params)] as JSON)
    }

    def listWithUid(String uid){
        def list = UserNumber.findAllBySecUser(SecUser.findByUid(uid)).number

        request.withFormat {
            json { render list as JSON }
            '*'{
                respond list, view: "listMyNumbers"
            }
        }
    }

    def buy(String uid){
        UserNumber.create SecUser.findByUid(uid), Number.findByUpid(request.JSON.upid), true
        respond instance, [status: CREATED]
    }

    def release(String upid){
        UserNumber.findByNumber(Number.findByUpid(upid)).delete flush: true

        request.withFormat {
            json { render status: OK }
            '*'{
                redirect method:"GET"
            }
        }
    }

    @Transactional
    def create() {
        def number = new Number(request.JSON.number).save flush: true
        render ([number: number] as JSON)
    }

    @Transactional
    def deleteWithUpid(String upid){
        def instance = Number.findByUpid(upid)

        if (instance == null) {
            respond status: NOT_FOUND
            return
        }

        instance.delete flush:true
        respond status: OK
    }

}
