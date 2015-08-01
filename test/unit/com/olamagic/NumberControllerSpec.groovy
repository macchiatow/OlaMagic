package com.olamagic

import com.olamagic.auth.SecRole
import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole
import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import org.junit.Before
import spock.lang.Specification

import static com.olamagic.util.JsonWrapper.toJson

@TestFor(NumberController)
@Mock([Number])
class NumberControllerSpec extends Specification {

    def number = new Number(upid: '0931326201')
    def otherNumber = new Number(upid: '0931326202')

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

    static loadExternalBeans = true

    @Before
    void registerJsonMarshallers() {
        applicationContext.getBean('customObjectMarshallers').register()
    }
}
