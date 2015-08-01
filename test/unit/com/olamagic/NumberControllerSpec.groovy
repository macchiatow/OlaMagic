package com.olamagic

import com.olamagic.auth.SecUser
import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import org.junit.Before
import spock.lang.Specification

@TestFor(NumberController)
@Mock([Number, SecUser, Profile, Workspace])
class NumberControllerSpec extends Specification {

    def number = new Number(upid: '0931326201')

    def otherNumber = new Number(upid: '0931326202')

    def mockUser = new SecUser(
            email: 'some@email.com',
            password: '***',
            authorities: ['ROLE_USER']
    )

    void "Test the 'list' action returns the correct model"() {
        when:"A domain instances is created"
        number.save flush: true
        otherNumber.save flush: true

        then:"They exist"
            Number.count() == 2

        when:"The 'list' action is executed"
            request.method = 'GET'
            response.format = 'json'
            controller.list()

        then:"The model is correct"
            response.json.numbers[0].id != null
            response.json.numbers[0].upid == number.upid
            response.json.numbers[1].id != response.json.numbers[0].id
            response.json.numbers[1].upid == otherNumber.upid
    }

    void "Test the 'create' action correctly persists an instance"() {
        when:"Exists user"
            number.save flush: true
        and:"The create action is executed with a valid request"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'POST'
            request.json = [
                number : [
                        id: 999,     // trying to pass id should not effect
                        upid: otherNumber.upid
                ]
            ]
            controller.create()

        then:"An instance saved"
            Number.count() == 2

        and:"The model is correct"
            response.json.number.id != null
            response.json.number.upid == otherNumber.upid
    }

    void "Test that the 'delete' action deletes an instance if it exists"() {
        when:"The delete action is called for a null instance"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'DELETE'
            controller.delete(null)

        then:"A 404 is returned"
            response.status == 404

        when:"A domain instance is created"
            response.reset()
            number.save flush: true

        then:"It exists"
            Number.count() == 1

        when:"The domain instance is passed to the delete action"
            controller.delete(number.upid)

        then:"The instance is deleted"
            Number.count() == 0
            response.status == 200
    }

    void "Test that the 'buy' action assigns workspace to a number"() {
        when:"User, workspace and available number exist"
            mockUser.save flush: true
            number.save flush: true

        and:"The 'buy' action is called for a null or invalid instance"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'DELETE'
            controller.buy(Workspace.first().id, null)

        then:"A 404 is returned"
            response.status == 404

        when:"Invalid wid given"
            response.reset()
            controller.buy(null, number.upid)

        then:"A 404 is returned"
            response.status == 404

        when:"The correct workspace id and upidis passed to the buy action"
            response.reset()
            controller.buy(Workspace.first().id, number.upid)

        then:"The model is correct"
            response.json.number.id == number.id
            response.json.number.upid == number.upid
            response.json.number.workspace == mockUser.profile.workspaces[0].title
        and:"Workspace contains the number"
            mockUser.profile.workspaces[0].myNumbers.size() == 1
            mockUser.profile.workspaces[0].myNumbers.contains(number)
    }

    static loadExternalBeans = true

    @Before
    void registerJsonMarshallers() {
        applicationContext.getBean('customObjectMarshallers').register()
    }
}
