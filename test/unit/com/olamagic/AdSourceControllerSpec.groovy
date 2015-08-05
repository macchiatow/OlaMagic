package com.olamagic

import com.olamagic.auth.SecUser
import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import org.junit.Before
import spock.lang.Specification

@TestFor(AdSourceController)
@Mock([AdSource, Site, SecUser, Workspace, Profile, Number])
class AdSourceControllerSpec extends Specification {

    def mockUser = new SecUser(
        email: 'some@email.com',
        password: '***',
        authorities: ['ROLE_USER']
    )

    def mockSite = new Site(
        name: 'One site',
        details: 'Just a details'
    )

    def mockAdSource = new AdSource(
        name: 'One adSource',
        description: 'Just a description'
    )

    def mockNumber = new Number(upid: '0931326201')

    void "Test the 'list' action returns the correct model"() {
        when:"A user instance is created"
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockAdSource.site = mockSite
            mockSite.save flush: true
            mockAdSource.save flush: true

        then:"One adSource exist"
            Workspace.count() == 1
            Site.count() == 1
            AdSource.count() == 1

        when:"The index action is executed with null object"
            request.method = 'GET'
            response.format = 'json'
            controller.list(null)

        then:"A 404 is returned"
            response.status == 404

        when:"The list action is executed with a valid request"
            response.reset()
            controller.list(mockSite.id)

        then:"The model is correct"
            response.status == 200
            response.json.adSources[0].id == mockAdSource.id
            response.json.adSources[0].description == mockAdSource.description
            response.json.adSources[0].name == mockAdSource.name
    }

    void "Test the 'create' action correctly persists an instance"() {
        when:"Exists user"
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockSite.save flush: true

        and:"The create action is executed with a valid request"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'POST'
            request.json = [
                adSource : [
                    id: 999,     // trying to pass id should not effect
                    description: mockAdSource.description,
                    name: mockAdSource.name
                ]
            ]
            controller.create(mockSite.id)

        then:"An instance saved"
            AdSource.count() == 1
            mockSite.adSources.size() == 1

        and:"Response model is correct"
            response.json.adSource.id != null
            response.json.adSource.description == mockAdSource.description
            response.json.adSource.name == mockAdSource.name
    }

    void "Test that the 'delete' action deletes an instance if it exists"() {
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
            mockAdSource.site = mockSite
            mockSite.save flush: true
            mockAdSource.save flush: true

        then:"Site exists"   
            AdSource.count() == 1

        when:"The adSource id is passed to the delete action"
           controller.delete(mockAdSource.id)

        then:"The instance is deleted"
            AdSource.count() == 0
            response.status == 200
    }

    void "Test the 'update' action performs an update on a valid domain instance"() {
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
            mockAdSource.site = mockSite
            mockSite.save flush: true
            mockAdSource.save flush: true

        and:"A valid domain instance is passed to the update action"
            response.reset()
            request.json = [
                adSource : [
                    id: 999,     // trying to pass id should not effect
                    description: mockAdSource.description,
                    name: mockAdSource.name
                ]
            ]
            controller.update(mockAdSource.id)

        then:"The instance updated"
            response.status == 200
            response.json.adSource.id == mockAdSource.id
            response.json.adSource.description == mockAdSource.description
            response.json.adSource.name == mockAdSource.name
    }

    void "Test the 'addNumber' action returns the correct model"() {
        when:"An adSource and a number instance created"
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockNumber.workspace = workspace
            mockAdSource.site = mockSite.save flush: true
            mockAdSource.save flush: true
            mockNumber.save flush: true

        then:"One adSource and one number exist"
            AdSource.count() == 1
            Number.count() == 1

        when:"The index action is executed with null object"
            request.method = 'PUT'
            response.format = 'json'
            controller.addNumber(null, null)

        then:"A 404 is returned"
            response.status == 404

        when:"The list action is executed with a valid request"
            response.reset()
            controller.addNumber(mockAdSource.id, mockNumber.upid)

        then:"The model is correct"
            response.status == 200
            response.json.adSource.id == mockAdSource.id
            response.json.adSource.description == mockAdSource.description
            response.json.adSource.name == mockAdSource.name
            response.json.adSource.numbers == [mockNumber.upid]
    }

    void "Test the 'removeNumber' action returns the correct model"() {
        when:"An adSource and a number instance created"
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockNumber.workspace = workspace
            mockAdSource.site = mockSite.save flush: true
            mockNumber.adSource = mockAdSource.save flush: true
            mockNumber.save flush: true

        then:"One adSource and one number exist"
            AdSource.count() == 1
            Number.count() == 1

        when:"The index action is executed with null object"
            request.method = 'PUT'
            response.format = 'json'
            controller.removeNumber(null, null)

        then:"A 404 is returned"
            response.status == 404

        when:"The list action is executed with a valid request"
            response.reset()
            controller.removeNumber(mockAdSource.id, mockNumber.upid)

        then:"The model is correct"
            response.status == 200
            response.json.adSource.id == mockAdSource.id
            response.json.adSource.description == mockAdSource.description
            response.json.adSource.name == mockAdSource.name
            response.json.adSource.numbers == []
    }

    static loadExternalBeans = true

    @Before
    void registerJsonMarshallers() {
        applicationContext.getBean('customObjectMarshallers').register()
    }
}
