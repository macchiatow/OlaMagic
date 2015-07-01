package com.olamagic

import com.olamagic.join.UserAdSource

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class AdSourceController {

    def springSecurityService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        def list = UserAdSource.findAllBySecUser(springSecurityService.currentUser)*.adSource.take(Math.min(max ?: 10, 100))
        respond list, model:[adSourceInstanceCount: AdSource.count()]
    }

    def show(AdSource adSourceInstance) {
        respond adSourceInstance
    }

    def create() {
        respond new AdSource(params)
    }

    @Transactional
    def save(AdSource adSourceInstance) {
        if (adSourceInstance == null) {
            notFound()
            return
        }

        if (adSourceInstance.hasErrors()) {
            respond adSourceInstance.errors, view:'create'
            return
        }

        adSourceInstance.save flush:true
        UserAdSource.create springSecurityService.currentUser, adSourceInstance, true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'adSource.label', default: 'AdSource'), adSourceInstance.id])
                redirect adSourceInstance
            }
            '*' { respond adSourceInstance, [status: CREATED] }
        }
    }

    def edit(AdSource adSourceInstance) {
        respond adSourceInstance
    }

    @Transactional
    def update(AdSource adSourceInstance) {
        if (adSourceInstance == null) {
            notFound()
            return
        }

        if (adSourceInstance.hasErrors()) {
            respond adSourceInstance.errors, view:'edit'
            return
        }

        adSourceInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'AdSource.label', default: 'AdSource'), adSourceInstance.id])
                redirect adSourceInstance
            }
            '*'{ respond adSourceInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(AdSource adSourceInstance) {

        if (adSourceInstance == null) {
            notFound()
            return
        }

        UserAdSource.remove springSecurityService.currentUser, adSourceInstance, true
        adSourceInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'AdSource.label', default: 'AdSource'), adSourceInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'adSource.label', default: 'AdSource'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
