package com.olamagic

import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole
import com.olamagic.join.UserNumber
import grails.converters.JSON
import grails.transaction.Transactional

import static org.springframework.http.HttpStatus.*

@Transactional(readOnly = true)
class UserController {

    // static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def show(String uid) {
        def userInstance = SecUser.findByUid(uid)

        if (userInstance == null) {
            notFound()
            return
        }

        respond userInstance
    }

    def listWorkspaces(String uid) {
        render '{"workspaces": [{"id":1, "title":"WS01"}, {"id":2, "title":"WS02"}] }'
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond SecUser.list(params), model: [secUserInstanceCount: SecUser.count()]
    }

    @Transactional
    def update(String uid) {
        def userInstance = SecUser.findByUid(uid);

        if (userInstance == null) {
            notFound()
            return
        }

        createOrUpdate(userInstance)
    }

    @Transactional
    def create() {
        def userInstance = new SecUser()

        createOrUpdate(userInstance)
    }

    @Transactional
    def deleteWithUid(String uid) {
        def userInstance = SecUser.findByUid(uid)

        if (userInstance == null) {
            notFound()
            return
        }

        SecUserSecRole.findAllBySecUser(userInstance)*.delete flush: true
        UserNumber.findAllBySecUser(userInstance)*.delete flush: true
        userInstance.delete flush: true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'SecUser.label', default: 'SecUser'), uid])
                redirect method: "GET"
            }
            '*' { render status: OK }
        }

    }

    protected void notFound() {
        request.withFormat {
            json { render status: NOT_FOUND }
            '*' {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'secUser.label', default: 'SecUser'), params.uid])
                redirect method: "GET"
            }
        }
    }

    private createOrUpdate(def instance) {
        request.withFormat {
            form multipartForm {
                bindProperties(instance, params).saveWithAuthorities()
                flash.message = message(code: 'default.created.message', args: [message(code: 'secUser.label', default: 'SecUser'), instance.id])
                redirect method: "GET"
            }
            json {
                bindProperties(instance, request.JSON).saveWithAuthorities()
                render instance as JSON
            }
            '*' { respond instance, [status: CREATED] }
        }
    }

    private bindProperties(def instance, def params) {
        instance.properties = params
        instance._authorities = params.authorities instanceof String ? [] << params.authorities : params.authorities
        instance
    }
}
