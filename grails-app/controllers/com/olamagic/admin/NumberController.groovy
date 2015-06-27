package com.olamagic.admin

import com.olamagic.Number

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class NumberController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Number.list(params), model:[numberInstanceCount: Number.count()]
    }

    def show(Number numberInstance) {
        respond numberInstance
    }

    def create() {
        respond new Number(params)
    }

    @Transactional
    def save(Number numberInstance) {
        if (numberInstance == null) {
            notFound()
            return
        }

        if (numberInstance.hasErrors()) {
            respond numberInstance.errors, view:'create'
            return
        }

        numberInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'number.label', default: 'Number'), numberInstance.id])
                redirect numberInstance
            }
            '*' { respond numberInstance, [status: CREATED] }
        }
    }

    def edit(Number numberInstance) {
        respond numberInstance
    }

    @Transactional
    def update(Number numberInstance) {
        if (numberInstance == null) {
            notFound()
            return
        }

        if (numberInstance.hasErrors()) {
            respond numberInstance.errors, view:'edit'
            return
        }

        numberInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'Number.label', default: 'Number'), numberInstance.id])
                redirect numberInstance
            }
            '*'{ respond numberInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(Number numberInstance) {

        if (numberInstance == null) {
            notFound()
            return
        }

        numberInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'Number.label', default: 'Number'), numberInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'number.label', default: 'Number'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
