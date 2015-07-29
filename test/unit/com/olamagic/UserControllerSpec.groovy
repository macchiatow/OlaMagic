package com.olamagic
import com.olamagic.auth.SecRole
import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole
import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

import static com.olamagic.util.JsonWrapper.toJson

@TestFor(UserController)
@Mock([SecUser, SecUserSecRole, SecRole, Profile, Workspace])
class UserControllerSpec extends Specification {

    def mockUser = new SecUser(
        email: 'some@email.com',
        password: '***',
        authorities: ['ROLE_USER']
    )

    def mockRole = new SecRole(
        authority: 'ROLE_USER'
    )

    void "Test the 'list' action returns the correct model"() {
        when:"A domain instance is created"
            mockUser.save flush: true

        then:"It exists"
            SecUser.count() == 1

        when:"The index action is executed"
            request.method = 'GET'
            response.format = 'json'
            controller.list()

        then:"The model is correct"
            response.status == 200
            response.contentAsString == toJson('users', [mockUser])
    }

    void "Test the 'create' action correctly persists an instance"() {
        when:"Exists user role"
            mockRole.save flush: true
        and:"The save action is executed with a valid request"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'POST'
            request.json = [
                id: 999,  // trying to pass id should not effect
                email: 'some2@email.com',
                password: '***',
                authorities: ['ROLE_USER', 'NOT-EXISTING_ROLE']
            ]
            controller.create()

        then:"An instance saved"
            SecUser.count == 1
            response.status == 200
            response.json.user.id != null
            response.json.user.email =='some2@email.com'
            response.json.user.authorities == ['ROLE_USER']
        and:"Dependencies set correctly"
            Profile.count == 1
            Workspace.count == 1
            SecUser.first().profile == Workspace.first().owner
            Workspace.first().owner == Profile.first()
    }

    void "Test that the 'show' action returns the correct model"() {
        when:"The show action is executed with a null domain"
            controller.show(null)

        then:"A 404 error is returned"
            response.status == 404

        when:"A domain instance is passed to the show action"
            mockUser.save flush: true
            controller.show(mockUser.id)

        then:"A model is populated containing the domain instance"
            response.contentAsString == toJson('user', mockUser)
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
            controller.update(1001)

        then:"The edit view is rendered again with the invalid instance"
            response.status == 404

        when:"Exists user role"
            mockRole.save flush: true

        and:"A valid domain instance is passed to the update action"
            response.reset()
            mockUser.save flush: true
            request.json = [
                id: 999,        // trying to pass id should not effect
                email: "other@email.com",
                password: '***',
                authorities: ['ROLE_USER']
            ]
            controller.update(mockUser.id)

        then:"The instance updated"
            response.status == 200
            response.json.user.id == mockUser.id
            response.json.user.email =='other@email.com'
            response.json.user.authorities == ['ROLE_USER']
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
            mockUser.save flush: true

        then:"It exists"
            SecUser.count() == 1

        when:"The domain instance is passed to the delete action"
           controller.delete(mockUser.id)

        then:"The instance is deleted"
            SecUser.count() == 0
            response.status == 200
    }
}
