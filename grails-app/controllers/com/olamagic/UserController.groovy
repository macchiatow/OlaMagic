package com.olamagic

import com.olamagic.auth.SecRole
import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole
import grails.converters.JSON
import grails.transaction.Transactional
import org.codehaus.groovy.grails.web.json.JSONObject

import static com.olamagic.util.JsonWrapper.getToJson
import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE
import static org.springframework.http.HttpStatus.NOT_FOUND

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
            render([users: SecUser.createCriteria().list({ like("email", "%${params.email}%") })] as JSON)
            return
        }
        params.max = Math.min(max ?: 10, 100)
        render toJson('users', SecUser.list(params))
    }

    @Transactional
    def update(Long id) {
        def user = SecUser.findById(id);

        if (user == null) {
            render status: NOT_FOUND
            return
        }

        def jsonUser = request.JSON.user.findAll { k, v -> !JSONObject.NULL.equals(v) }
        bindData(user, jsonUser, [exclude: ['workspacesContributing', 'email']])

        def adminRole = SecRole.findByAuthority('ROLE_ADMIN')
        def userRole = SecRole.findByAuthority('ROLE_USER')

        if (jsonUser.isAdmin && !user.authorities.contains(adminRole)) {
            SecUserSecRole.create user, adminRole, true
            SecUserSecRole.findBySecUserAndSecRole(user, userRole)*.delete()
        } else if (!jsonUser.isAdmin && user.authorities.contains(adminRole)) {
            SecUserSecRole.create user, userRole, true
            SecUserSecRole.findBySecUserAndSecRole(user, adminRole)*.delete()
        }

        user.save(flush: true)
        render([user: user] as JSON)
    }

    @Transactional
    def create() {
        def jsonUser = request.JSON.user

        if (jsonUser.email == null) {
            render status: NOT_ACCEPTABLE
            return
        }

        jsonUser.password = jsonUser.password ?: '123'

        def user = new SecUser(jsonUser)
        user.profile = new Profile(secUser: user)
        user.profile.addToWorkspacesOwning(new Workspace())
        user.save(flush: true, failOnError: true)

        SecRole secRole;
        if (jsonUser.isAdmin) {
            secRole = SecRole.findByAuthority('ROLE_ADMIN')
        } else {
            secRole = SecRole.findByAuthority('ROLE_USER')
        }

        SecUserSecRole.create user, secRole, true


        render([user: user] as JSON)
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
