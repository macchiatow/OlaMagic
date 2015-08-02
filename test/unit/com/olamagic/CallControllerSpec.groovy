/**
 * Created by togrul on 8/2/15.
 */
package com.olamagic

import com.olamagic.auth.SecUser
import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import org.junit.Before
import spock.lang.Specification

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

    static loadExternalBeans = true

    @Before
    void registerJsonMarshallers() {
        applicationContext.getBean('customObjectMarshallers').register()
    }

}