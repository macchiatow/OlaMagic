/**
 * Created by togrul on 8/2/15.
 */
package com.olamagic

import com.olamagic.auth.SecUser
import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import org.junit.Before
import spock.lang.Ignore
import spock.lang.Specification

@Ignore
@TestFor(CallController)
@Mock([Number, Call])
class CallControllerSpec extends Specification {

    def mockNumber = new Number(upid: '0931326201')

    void "Test the 'create' action correctly persists an instance"() {
        when:"Exists number"
            mockNumber.save flush: true
        and:"The create action is executed with a valid request"
            request.contentType = JSON_CONTENT_TYPE
            request.method = 'POST'
            request.json = [
                call : [
                        id: 999,     // trying to pass id should not effect
                        title: 'Another workspace',
                        number: [
                                upid: mockNumber.upid
                        ]

                ]
            ]
            controller.create()

        then:"An instance saved"
            Call.count() == 1
            Call.first().number == mockNumber

        and:"Response model is correct"
            response.json.call.id != null
            response.json.call.date != null
            response.json.call.upid == mockNumber.upid
    }

    void "Test that the 'list' action returns the correct model"() {
        when:"Number and two calls exist"
            mockNumber.save flush: true
            2.times { new Call(number: mockNumber).save(flush: true) }

        and:"The 'list' action is called for a null or invalid wid"
            request.method = 'GET'
            controller.list(null)

        then:"An empty list is returned"
            response.json.calls == []

        when:"The correct upid passed to the 'list' action"
            response.reset()
            controller.list(mockNumber.upid)

        then:"The model is correct"
            response.json.calls.size() == 2
            response.json.calls[0].id != null
            response.json.calls[0].upid == mockNumber.upid
            response.json.calls[1].upid == mockNumber.upid
            response.json.calls[1].id != null
    }

    void "Test that the 'clear' action deletes all calls for a number"() {
        when:"Number and two calls exist"
            mockNumber.save flush: true
            2.times { new Call(number: mockNumber).save(flush: true) }

        then:"Calls exist"
            Call.findAllByNumber(mockNumber).size == 2

        when:"The 'list' action is called for a null or invalid wid"
            request.method = 'DELETE'
            controller.clear(null)

        then:"A 404 is returned"
            response.status == 404

        when:"The correct upid passed to the 'list' action"
            response.reset()
            controller.clear(mockNumber.upid)

        then:"The calls deleted"
            response.status == 200
            Call.findAllByNumber(mockNumber).size() == 0
    }

    static loadExternalBeans = true

    @Before
    void registerJsonMarshallers() {
        applicationContext.getBean('customObjectMarshallers').register()
    }

}