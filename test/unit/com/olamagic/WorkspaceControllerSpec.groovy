package com.olamagic
import com.olamagic.auth.SecUser
import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import org.junit.Before
import spock.lang.Specification

@TestFor(WorkspaceController)
@Mock([SecUser, Workspace, Profile, WorkspaceContributor])
class WorkspaceControllerSpec extends Specification {

    def mockUser = new SecUser(
        email: 'some@email.com',
        password: '***',
        authorities: ['ROLE_USER']
    )

    def mockOtherUser = new SecUser(
        email: 'other@email.com',
        password: '***',
        authorities: ['ROLE_USER']
    )

    void "Test the 'create' action correctly persists an instance"() {
        when:"Exists user"
            mockUser.save flush: true
        and:"The create action is executed with a valid request"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'POST'
            request.json = [
                workspace : [
                    id: 999,     // trying to pass id should not effect
                    title: 'Another workspace',
                    owner: mockUser.profile.id
                ]
            ]
            controller.create()

        then:"An instance saved"
            Workspace.count() == 1
            mockUser.profile.workspacesOwning.size() == 1

        and:"Response model is correct"
            response.status == 200
            response.json.workspace.id != null
            response.json.workspace.owner == mockUser.profile.id
    }

    void "Test that the delete action deletes an instance if it exists"() {
        when:"The delete action is called for null"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'DELETE'
            controller.delete(null)

        then:"A 404 is returned"
            response.status == 404

        when:"A workspace instance is created"
            response.reset()
            request.method = 'POST'
            request.json = [
                workspace : [
                        id: 999,     // trying to pass id should not effect
                        title: 'Another workspace',
                        owner: mockUser.profile.id
                ]
            ]
            controller.create()

        and:"The workspace id is passed to the delete action"
            response.reset()
            controller.delete(mockUser.profile.workspacesOwning[0].id)

        then:"The instance is not deleted; at least one workspace should exist for a user"
            Workspace.count() == 1
            response.status == 406

        when:"A user has more than one workspace"
            controller.create()

        then:"Exist two workspaces"
            Workspace.count() == 2

        when:"The workspace id is passed to the delete action again"
            response.reset()
            controller.delete(mockUser.profile.workspacesOwning[0].id)

        then:"The instance is deleted"
            Workspace.count() == 1
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
            def workspace = new Workspace(owner: mockUser.profile).save flush: true


        and:"A valid domain instance is passed to the update action"
            response.reset()
            request.json = [
                workspace : [
                    title: 'other title'
                ]
            ]
            controller.update(workspace.id)

        then:"The instance updated"
            response.status == 200
            response.json.workspace.title =='other title'
    }

    void "Test the 'subscribe' action returns the correct model"() {
        when:"A user instance is created"
            mockUser.save flush: true
            mockOtherUser.save flush: true

        then:"Two workspaces are already created"
            Workspace.count() == 2
            mockUser.profile.workspaces.size() == 1
            mockOtherUser.profile.workspaces.size() == 1
            !mockUser.profile.workspaces.first().equals(mockOtherUser.profile.workspaces.first())

        when:"Subscribe is called for a uid that doesn't exist"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'POST'
            response.format = 'json'
            controller.subscribe(null, mockUser.profile.workspaces[0].id)    

        then:"The instance is not found"
            response.status == 404    

        when:"Subscribe is called for a wid that doesn't exist"
            response.reset()
            controller.subscribe(mockOtherUser.id, null)    

        then:"The instance is not found"
            response.status == 404   

        when:"Subscribe is called for a uid that is workspace owner"
            response.reset()
            controller.unsubscribe(mockUser.id, mockUser.profile.workspaces[0].id)

        then:"The action is not accepted"
            response.status == 406                

        when:"Subscribe is called for valid uid and wid"
            response.reset()
            controller.subscribe(mockOtherUser.id, mockUser.profile.workspaces[0].id)

        then:"The model is updated"
            response.status == 200
            response.json.workspace.id != null
            response.json.workspace.title != null
            response.json.workspace.owner == mockUser.email
            response.json.workspace.contributors == [mockOtherUser.email]
    }

    void "Test the 'unsubscribe' action returns the correct model"() {
        when:"A user instance is created"
            mockUser.save flush: true
            mockOtherUser.save flush: true

        then:"Two workspaces are already created"
            Workspace.count() == 2


        when:"Subscribtion is created"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'POST'
            response.format = 'json'
            controller.subscribe(mockOtherUser.id, mockUser.profile.workspaces[0].id)    

        then:"The model is updated"
            response.json.workspace.owner == mockUser.email
            response.json.workspace.contributors == [mockOtherUser.email]

        when:"Subscribe is called for a wid that doesn't exist"
            response.reset()
            controller.unsubscribe(mockOtherUser.id, null)    

        then:"The instance is not found"
            response.status == 404      

        when:"Subscribe is called for a uid that doesn't exist"
            response.reset()
            controller.unsubscribe(null, mockUser.profile.workspaces[0].id)    

        then:"The instance is not found"
            response.status == 404  

        when:"Unsubscribe is called for a uid that is workspace owner"
            response.reset()
            controller.unsubscribe(mockUser.id, mockUser.profile.workspaces[0].id)      

        then:"The action is not accepted"
            response.status == 406      

        when:"Unsubscribe is called for valid uid and wid"
            response.reset()
            controller.unsubscribe(mockOtherUser.id, mockUser.profile.workspaces[0].id)  

        then:"The model is updated"
            response.json.workspace.id != null
            response.json.workspace.title != null
            response.json.workspace.owner == mockUser.email
            response.json.workspace.contributors == []   
    }

    void "Test the 'change_owner' action returns the correct model"() {
        when:"A user instance is created"
            mockUser.save flush: true
            mockOtherUser.save flush: true

        then:"Two workspaces are already created"
            Workspace.count() == 2

        when:"ChangeOwner is called for a wid that doesn't exist"
            response.reset()
            controller.changeOwner(mockOtherUser.id, null)    

        then:"The instance is not found"
            response.status == 404      

        when:"ChangeOwner is called for a uid that doesn't exist"
            response.reset()
            controller.changeOwner(null, mockUser.profile.workspaces[0].id)    

        then:"The instance is not found"
            response.status == 404  

        when:"ChangeOwner is called for a uid that is workspace owner"
            response.reset()
            controller.changeOwner(mockUser.id, mockUser.profile.workspaces[0].id)      

        then:"The action is not accepted"
            response.status == 406      

        when:"ChangeOwner is called for valid uid and wid"
            response.reset()
            controller.changeOwner(mockOtherUser.id, mockUser.profile.workspaces[0].id)  

        then:"The model is updated"
            response.json.workspace.id != null
            response.json.workspace.title != null
            response.json.workspace.owner == mockOtherUser.email
            response.json.workspace.contributors == []  

        and:"New workspace created for user without one"
            Workspace.count() == 3
            mockUser.profile.workspaces.size() == 1

    }

    static loadExternalBeans = true

    @Before
    void registerJsonMarshallers() {
        applicationContext.getBean('customObjectMarshallers').register()

        mockUser.profile = new Profile()
        mockUser.save()
    }


}
