package com.olamagic

import com.olamagic.auth.SecUser
import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import org.junit.Before
import spock.lang.Specification

@TestFor(CampaignController)
@Mock([Campaign, Site, SecUser, Workspace, Profile, Number])
class CampaignControllerSpec extends Specification {

    def mockUser = new SecUser(
        email: 'some@email.com',
        password: '***',
        authorities: ['ROLE_USER']
    )

    def mockSite = new Site(
        name: 'One site',
        details: 'Just a details'
    )

    def mockCampaign = new Campaign(
        name: 'One campaign',
        description: 'Just a description'
    )

    def mockNumber = new Number(upid: '0931326201')

    void "Test the 'list' action returns the correct model"() {
        when:"A user instance is created"
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockCampaign.site = mockSite
            mockSite.save flush: true
            mockCampaign.save flush: true

        then:"One campaign exist"
            Workspace.count() == 1
            Site.count() == 1
            Campaign.count() == 1

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
            response.json.campaigns.size() == 1
            response.json.campaigns[0].id == mockCampaign.id
            response.json.campaigns[0].description == mockCampaign.description
            response.json.campaigns[0].name == mockCampaign.name
    }

    void "Test the 'create' action correctly persists an instance"() {
        when:"Exists user"
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockSite.save flush: true

        and:"invalid site id passed"
            controller.create(null)    

        then:"A 404 is returned"
            response.status == 404    

        when:"The create action is executed with a valid request"
            response.reset()
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'POST'
            request.json = [
                campaign : [
                    id: 999,     // trying to pass id should not effect
                    description: mockCampaign.description,
                    name: mockCampaign.name
                ]
            ]
            controller.create(mockSite.id)

        then:"An instance saved"
            Campaign.count() == 1
            mockSite.campaigns.size() == 1

        and:"Response model is correct"
            response.json.campaign.id != null
            response.json.campaign.description == mockCampaign.description
            response.json.campaign.name == mockCampaign.name
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
            mockCampaign.site = mockSite
            mockSite.save flush: true
            mockCampaign.save flush: true

        then:"Site exists"   
            Campaign.count() == 1

        when:"The campaign id is passed to the delete action"
           controller.delete(mockCampaign.id)

        then:"The instance is deleted"
            Campaign.count() == 0
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
            mockCampaign.site = mockSite
            mockSite.save flush: true
            mockCampaign.save flush: true

        and:"A valid domain instance is passed to the update action"
            response.reset()
            request.json = [
                campaign : [
                    id: 999,     // trying to pass id should not effect
                    description: mockCampaign.description,
                    name: mockCampaign.name
                ]
            ]
            controller.update(mockCampaign.id)

        then:"The instance updated"
            response.status == 200
            response.json.campaign.id == mockCampaign.id
            response.json.campaign.description == mockCampaign.description
            response.json.campaign.name == mockCampaign.name
    }

    void "Test the 'listNumbers' action returns the correct model"() {
        when:"A user instance is created"
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockNumber.workspace = workspace
            mockCampaign.site = mockSite.save flush: true
            mockNumber.campaign = mockCampaign.save flush: true
            mockNumber.save flush: true

        then:"One campaign exist"
            Number.count() == 1
            Workspace.count() == 1
            Site.count() == 1
            Campaign.count() == 1

        when:"The index action is executed with null object"
            request.method = 'GET'
            response.format = 'json'
            controller.listNumbers(null)

        then:"A 404 is returned"
            response.status == 404

        when:"The list action is executed with a valid request"
            response.reset()
            controller.listNumbers(mockCampaign.id)

        then:"The model is correct"
            response.status == 200
            response.json.numbers.size() == 1
            response.json.numbers[0].id == mockNumber.id
            response.json.numbers[0].upid == mockNumber.upid
    }

    void "Test the 'addNumber' action returns the correct model"() {
        when:"An campaign and a number instance created"
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockNumber.workspace = workspace
            mockCampaign.site = mockSite.save flush: true
            mockCampaign.save flush: true
            mockNumber.save flush: true

        then:"One campaign and one number exist"
            Campaign.count() == 1
            Number.count() == 1

        when:"The index action is executed with null object"
            request.method = 'PUT'
            response.format = 'json'
            controller.addNumber(null, null)

        then:"A 404 is returned"
            response.status == 404

        when:"The list action is executed with a valid request"
            response.reset()
            controller.addNumber(mockCampaign.id, mockNumber.upid)

        then:"The model is correct"
            response.status == 200
            response.json.campaign.id == mockCampaign.id
            response.json.campaign.description == mockCampaign.description
            response.json.campaign.name == mockCampaign.name
            response.json.campaign.numbers == [mockNumber.upid]
    }

    void "Test the 'removeNumber' action returns the correct model"() {
        when:"An campaign and a number instance created"
            mockUser.save flush: true
            def workspace = Workspace.first()
            mockSite.workspace = workspace
            mockNumber.workspace = workspace
            mockCampaign.site = mockSite.save flush: true
            mockNumber.campaign = mockCampaign.save flush: true
            mockNumber.save flush: true

        then:"One campaign and one number exist"
            Campaign.count() == 1
            Number.count() == 1

        when:"The index action is executed with null object"
            request.method = 'PUT'
            response.format = 'json'
            controller.removeNumber(null, null)

        then:"A 404 is returned"
            response.status == 404

        when:"The list action is executed with a valid request"
            response.reset()
            controller.removeNumber(mockCampaign.id, mockNumber.upid)

        then:"The model is correct"
            response.status == 200
            response.json.campaign.id == mockCampaign.id
            response.json.campaign.description == mockCampaign.description
            response.json.campaign.name == mockCampaign.name
            response.json.campaign.numbers == []
    }

    static loadExternalBeans = true

    @Before
    void registerJsonMarshallers() {
        applicationContext.getBean('customObjectMarshallers').register()
    }
}
