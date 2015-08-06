package com.olamagic

import com.olamagic.auth.SecUser
import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import org.junit.Before
import spock.lang.Specification

@TestFor(SiteController)
@Mock([Site, SecUser, Workspace, Profile])
class SiteControllerSpec extends Specification {

    def mockUser = new SecUser(
        email: 'some@email.com',
        password: '***',
        authorities: ['ROLE_USER']
    )

    def mockSite = new Site(
        name: 'One site',
        details: 'Just a details'
    )

    void "Test the 'list' action returns the correct model"() {
        when:"A user instance is created"
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockSite.save flush: true

        then:"One site exist"
            Site.count() == 1

        when:"The index action is executed with null object"
            request.method = 'GET'
            response.format = 'json'
            controller.list(null)

        then:"An empty list is returned"
            response.json.sites == []

        when:"The list action is executed with a valid request"
            response.reset()
            controller.list(workspace.id)

        then:"The model is correct"
            response.status == 200
            response.json.sites[0].id == mockSite.id
            response.json.sites[0].details == mockSite.details
            response.json.sites[0].name == mockSite.name
    }

    void "Test the 'create' action correctly persists an instance"() {
        when:"Exists user"
            mockUser.save flush: true
            def workspace = Workspace.first()

        and:"The create action is executed with a valid request"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'POST'
            request.json = [
                site : [
                    id: 999,     // trying to pass id should not effect
                    details: mockSite.details,
                    name: mockSite.name
                ]
            ]
            controller.create(workspace.id)

        then:"An instance saved"
            Site.count() == 1
            workspace.sites.size() == 1

        and:"Response model is correct"
            response.json.site.id != null
            response.json.site.details == mockSite.details
            response.json.site.name == mockSite.name
    }

    void "Test that the delete action deletes an instance if it exists"() {
        when:"The delete action is called for null"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'DELETE'
            controller.delete(null)

        then:"A 404 is returned"
            response.status == 404

        when:"A site instance is created"
            response.reset()
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockSite.save flush: true

        then:"Site exists"   
            Site.count() == 1

        when:"The site id is passed to the delete action"
           controller.delete(mockSite.id)

        then:"The instance is deleted"
            Site.count() == 0
            response.status == 200
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

        when:"Exists instance"
            response.reset()
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockSite.save flush: true

        and:"A valid domain instance is passed to the update action"
            response.reset()
            request.json = [
                site : [
                    id: 999,     // trying to pass id should not effect
                    details: 'other details',
                    name: 'other name'
                ]
            ]
            controller.update(mockSite.id)

        then:"The instance updated"
            response.status == 200
            response.json.site.id == mockSite.id
            response.json.site.details == 'other details'
            response.json.site.name == 'other name'
    }

    static loadExternalBeans = true

    @Before
    void registerJsonMarshallers() {
        applicationContext.getBean('customObjectMarshallers').register()
    }
}
