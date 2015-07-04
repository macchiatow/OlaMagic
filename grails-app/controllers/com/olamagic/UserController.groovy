package com.olamagic

import com.olamagic.auth.SecRole
import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole
import com.olamagic.join.UserNumber

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserController {

   // static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

   def show(String uid){
       def user =  SecUser.findByUid(uid)

       if (user == null) {
           notFound()
           return
       }

       respond user
   }

    def list(Integer max){
        params.max = Math.min(max ?: 10, 100)
        respond SecUser.list(params), model:[secUserInstanceCount: SecUser.count()]
    }

    def update(String uid){
        SecUser user = SecUser.findByUid(uid);
        request.withFormat {
            json {
                user.properties = request.JSON.findAll { k,v -> k != 'uid' }
                user.updateAuthorities(request.JSON.authorities)
                render user as JSON
            }
        }
    }

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond SecUser.list(params), model:[secUserInstanceCount: SecUser.count()]
    }

    def create() {
        def user = new SecUser(request.JSON)
        user.save (flush: true)
        user.updateAuthorities(request.JSON.authorities)
        render user as JSON
    }

    @Transactional
    def save(SecUser secUserInstance) {
        def defaultUserRole = SecRole.findByAuthority('ROLE_USER') ?: new SecRole(authority: 'ROLE_USER').save(failOnError: true)

        if (secUserInstance == null) {
            notFound()
            return
        }

        if (secUserInstance.hasErrors()) {
            respond secUserInstance.errors, view:'create'
            return
        }

        secUserInstance.save flush:true
        SecUserSecRole.create secUserInstance, defaultUserRole

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'secUser.label', default: 'SecUser'), secUserInstance.id])
                redirect secUserInstance
            }
            json { render secUserInstance as JSON }
            '*' { respond secUserInstance, [status: CREATED] }
        }
    }

//    @Transactional
//    def update(SecUser secUserInstance) {
//        println request.format
//        updateAuthorities(secUserInstance)
//
//        if (secUserInstance == null) {
//            notFound()
//            return
//        }
//
//        if (secUserInstance.hasErrors()) {
//            respond secUserInstance.errors, view:'edit'
//            return
//        }
//
//        secUserInstance.save flush:true
//
//        request.withFormat {
//            form multipartForm {
//                flash.message = message(code: 'default.updated.message', args: [message(code: 'SecUser.label', default: 'SecUser'), secUserInstance.id])
//                redirect secUserInstance
//            }
//            '*'{ respond secUserInstance, [status: OK] }
//        }
//    }

    @Transactional
    def deleteWithUid(String uid){
        def secUserInstance = SecUser.findByUid(uid)

        if (secUserInstance == null) {
            notFound()
            return
        }

        SecUserSecRole.findAllBySecUser(secUserInstance)*.delete flush: true
        UserNumber.findAllBySecUser(secUserInstance)*.delete flush: true
        secUserInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'SecUser.label', default: 'SecUser'), secUserInstance.uid])
                redirect method:"GET"
            }
            '*'{ render status: OK }
        }

    }

    protected void notFound() {
        request.withFormat {
            json { render status: NOT_FOUND }
            '*' {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'secUser.label', default: 'SecUser'), params.uid])
                redirect method:"GET"
            }
        }
    }
}
