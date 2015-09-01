package com.olamagic
import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole
import grails.converters.JSON
import grails.transaction.Transactional

import static com.olamagic.util.JsonWrapper.getToJson
import static org.springframework.http.HttpStatus.*

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

    def lookup(String email) {
        def userInstance = SecUser.findByEmail(email)

        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        render toJson('user', userInstance)
    }

    def list(Integer max) {
        if (params.email) {
                render ([users: SecUser.findAllByEmail(params.email)] as JSON)
                return
        }
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
        if (request.JSON.user.email == null || request.JSON.user.password == null){
            render status: NOT_ACCEPTABLE
            return
        }

        def user = new SecUser(request.JSON.user)
        user.profile = new Profile(secUser: user)
        user.profile.addToWorkspacesOwning(new Workspace())
        user.save()

        render ([user: user] as JSON)
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
