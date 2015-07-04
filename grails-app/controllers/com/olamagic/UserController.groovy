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
            '*'{
                user.properties = params
                def authorities = params.authorities instanceof String ? [] << params.authorities : params.authorities
                user.save(flush: true)
                user.updateAuthorities(authorities)
                flash.message = message(code: 'default.created.message', args: [message(code: 'secUser.label', default: 'SecUser'), uid])
                redirect method:"GET"
            }
        }
    }

    def create() {
        request.withFormat {
            form multipartForm {
                def secUserInstance = new SecUser(params)
                def authorities = params.authorities instanceof String ? [] << params.authorities : params.authorities
                secUserInstance.save(flush: true)
                secUserInstance.updateAuthorities(authorities)
                flash.message = message(code: 'default.created.message', args: [message(code: 'secUser.label', default: 'SecUser'), secUserInstance.id])
                redirect method:"GET"
            }
            json {
                def user = new SecUser(request.JSON)
                user.save (flush: true)
                user.updateAuthorities(request.JSON.authorities)
                render user as JSON
            }
            '*' { respond secUserInstance, [status: CREATED] }
        }
    }

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
