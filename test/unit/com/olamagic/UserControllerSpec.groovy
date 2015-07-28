package com.olamagic

import com.olamagic.auth.SecRole
import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole
import com.olamagic.util.JsonWrapper
import grails.converters.JSON
import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

import static com.olamagic.util.JsonWrapper.toJson

@TestFor(UserController)
@Mock([SecUser, SecUserSecRole, SecRole])
class UserControllerSpec extends Specification {

    def populateValidParams(params) {
        assert params != null
        params.uid = 'someValidName'
        params.password = 'someValidPassword'
    }

    void "Test the 'list' action returns the correct model"() {
        when:"A domain instance is created"
            populateValidParams(params)
            def user = new SecUser(params).save flush: true

        then:"It exists"
            SecUser.count() == 1

        when:"The index action is executed"
            request.method = 'GET'
            response.format = 'json'
            controller.list()

        then:"The model is correct"
            response.status == 200
            response.contentAsString == toJson('users', [user])
    }

    void "Test the 'save' action correctly persists an instance"() {
        when:"Exists user role"
            new SecRole(authority: 'ROLE_USER').save flush: true
        and:"The save action is executed with a valid request"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'POST'
            request.json = [
                uid: "someUid",
                password: '***',
                authorities: ['ROLE_USER', 'NOT-EXISTING_ROLE']
            ]
            controller.save()

        then:"An instance saved"
            SecUser.count() == 1
            response.status == 200
            response.json.user.id != null
            response.json.user.uid =='someUid'
            response.json.user.authorities == ['ROLE_USER']
    }

    void "Test that the show action returns the correct model"() {
        when:"The show action is executed with a null domain"
            controller.show(null)

        then:"A 404 error is returned"
            response.status == 404

        when:"A domain instance is passed to the show action"
            populateValidParams(params)
            def secUser = new SecUser(params).save flush: true
            controller.show(params.uid)

        then:"A model is populated containing the domain instance"
            response.contentAsString == toJson('user', secUser)
    }

    void "Test that the edit action returns the correct model"() {
        when:"The edit action is executed with a null domain"
            controller.edit(null)

        then:"A 404 error is returned"
            response.status == 404

        when:"A domain instance is passed to the edit action"
            populateValidParams(params)
            def secUser = new SecUser(params)
            controller.edit(secUser)

        then:"A model is populated containing the domain instance"
            model.secUserInstance == secUser
    }

    void "Test the update action performs an update on a valid domain instance"() {
        when:"Update is called for a domain instance that doesn't exist"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'PUT'
            controller.update(null)

        then:"A 404 error is returned"
            response.status == 404

        when:"An invalid domain instance is passed to the update action"
            response.reset()
            controller.update('wrong-uid')

        then:"The edit view is rendered again with the invalid instance"
            response.status == 404

        when:"A valid domain instance is passed to the update action"
            response.reset()
            populateValidParams(params)
            secUser = new SecUser(params).save(flush: true)
            controller.update(params.uid)

        then:"A redirect is issues to the show action"
            response.redirectedUrl == "/secUser/show/$secUser.id"
            flash.message != null
    }

    void "Test that the delete action deletes an instance if it exists"() {
        when:"The delete action is called for a null instance"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'DELETE'
            controller.delete(null)

        then:"A 404 is returned"
            response.status == 404

        when:"A domain instance is created"
            response.reset()
            populateValidParams(params)
            new SecUser(params).save flush: true

        then:"It exists"
            SecUser.count() == 1

        when:"The domain instance is passed to the delete action"
           controller.delete(params.uid)

        then:"The instance is deleted"
            SecUser.count() == 0
            response.status == 200
    }
}
