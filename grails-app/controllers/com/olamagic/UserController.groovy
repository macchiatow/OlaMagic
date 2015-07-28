package com.olamagic

import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole
import com.olamagic.join.UserNumber
import grails.converters.JSON
import grails.transaction.Transactional

import static com.olamagic.util.JsonWrapper.getToJson
import static org.springframework.http.HttpStatus.*

@Transactional(readOnly = true)
class UserController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    static responseFormats = ['json']

    def show(String uid) {
        def userInstance = SecUser.findByUid(uid)

        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        render toJson('user', userInstance)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        render toJson('users', SecUser.list(params))
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
    def save() {
        def userInstance = new SecUser()

        bindProperties(userInstance, request.JSON).saveWithAuthorities()
        render toJson('user', userInstance)
    }

    @Transactional
    def delete(String uid) {
        def userInstance = SecUser.findByUid(uid)

        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        SecUserSecRole.findAllBySecUser(userInstance)*.delete flush: true
        userInstance.delete flush: true

        render status: OK
    }

    private createOrUpdate(def instance) {
        bindProperties(instance, request.JSON).saveWithAuthorities()
        render instance as JSON
    }

    private bindProperties(def instance, def params) {
        instance.properties = params
        instance._authorities = params.authorities instanceof String ? [] << params.authorities : params.authorities
        instance
    }
}
