package com.olamagic.dashboard

import com.olamagic.Number
import com.olamagic.join.UserNumber


class MyNumbersController {

    static allowedMethods = [buy: "POST", release: "POST", index: "GET"]

    def springSecurityService

    def index() {
        def availableNumbers =  Number.list().findAll { !UserNumber.all.number.id.contains(it.id) }
        def myNumbers = UserNumber.findAllBySecUser(springSecurityService.currentUser)*.number
        render view: 'index', model: [availableNumbers: availableNumbers, myNumbers : myNumbers]
    }

    def buy(Number numberInstance){
        println request.parameterMap.get('number.id')
        UserNumber.create  springSecurityService.currentUser, numberInstance, true
        redirect view: 'index'
    }

    def release(Number numberInstance){
        UserNumber.remove springSecurityService.currentUser, numberInstance, true
        redirect view: 'index'
    }
}
