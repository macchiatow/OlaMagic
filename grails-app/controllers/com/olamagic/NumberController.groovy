package com.olamagic

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class NumberController {

    //static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def show(String upid){
        def instance =  Number.findByUpid(upid)

        if (instance == null) {
            notFound()
            return
        }

        respond instance
    }

    def list(Integer max){
        params.max = Math.min(max ?: 10, 100)
        respond Number.list(params), model:[numberInstanceCount: Number.count()]
    }

    @Transactional
    def create() {
        def instance = new Number()

        createOrUpdate(instance)
    }

    @Transactional
    def deleteWithUpid(String upid){
        def instance = Number.findByUpid(upid)

        if (instance == null) {
            notFound()
            return
        }

        instance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'Number.label', default: 'Number'), upid])
                redirect method:"GET"
            }
            '*'{ render status: OK }
        }

    }

    private createOrUpdate(def instance){
        request.withFormat {
            form multipartForm {
                bindProperties(instance, params).save flush: true
                flash.message = message(code: 'default.created.message', args: [message(code: 'number.label', default: 'Number'), instance.id])
                redirect method:"GET"
            }
            json {
                bindProperties(instance, request.JSON).save flush: true
                render instance as JSON
            }
            '*' { respond instance, [status: CREATED] }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'number.label', default: 'Number'), params.id])
                redirect method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }

    private bindProperties(def instance, def params){
        instance.properties = params
        instance
    }
}
