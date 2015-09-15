package com.olamagic

import com.olamagic.auth.SecRole
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

        userInstance.password = params.password
        userInstance.save(flush: true)
        render toJson('user', userInstance)
    }

    @Transactional
    def create() {
        def jsonUser = request.JSON.user

        if (jsonUser.email == null){
            render status: NOT_ACCEPTABLE
            return
        }

        jsonUser.password = jsonUser.password?:'123'

        def user = new SecUser(jsonUser)
        user.profile = new Profile(secUser: user)
        user.profile.addToWorkspacesOwning(new Workspace())
        user.save(flush: true, failOnError: true)

        SecRole secRole;
        if (jsonUser.isAdmin){
            secRole = SecRole.findByAuthority('ROLE_ADMIN')
        } else {
            secRole = SecRole.findByAuthority('ROLE_USER')
        }

        SecUserSecRole.create user, secRole, true


        render ([user: user] as JSON)
    }

    @Transactional
    def delete(Long id) {
        def profile = Profile.findById(id)

        if (profile == null) {
            render status: NOT_FOUND
            return
        }

        SecUserSecRole.findAllBySecUser(profile.secUser)*.delete flush: true
        profile.secUser.delete flush: true

        render '{}'
    }
}
