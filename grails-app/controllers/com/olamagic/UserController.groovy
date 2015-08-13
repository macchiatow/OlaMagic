package com.olamagic
import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole
import grails.transaction.Transactional

import static com.olamagic.util.JsonWrapper.getToJson
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

@Transactional(readOnly = true)
class UserController {

    static allowedMethods = [show: "GET", list: "GET", save: "POST", update: "PUT", delete: "DELETE"]

    static responseFormats = ['json']

    def show(Long id) {
        def userInstance = SecUser.findById(id)

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
    def update(Long id) {
        def userInstance = SecUser.findById(id);

        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        bindProperties(userInstance, request.JSON.user).saveWithAuthorities()
        render toJson('user', userInstance)
    }

    @Transactional
    def create() {
        def userInstance = new SecUser()
        
        bindProperties(userInstance, request.JSON.user).saveWithAuthorities()
        new Workspace(owner: userInstance.profile).save flush: true

        render toJson('user', userInstance)
    }

    @Transactional
    def delete(Long id) {
        def userInstance = SecUser.findById(id)

        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        SecUserSecRole.findAllBySecUser(userInstance)*.delete flush: true
        userInstance.delete flush: true

        render status: OK
    }

    private bindProperties(def instance, def params) {
        instance.properties = params
        instance._authorities = params.authorities
        instance
    }
}
