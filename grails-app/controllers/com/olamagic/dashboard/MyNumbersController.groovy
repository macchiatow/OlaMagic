package com.olamagic.dashboard

import com.olamagic.Number
import com.olamagic.join.UserNumber


class MyNumbersController {

    def springSecurityService

    def index() {
        def availableNumbers =  Number.list().findAll( { !UserNumber.all.number.id.contains(it.id) })
        render(view: 'index', model: [availableNumbers: availableNumbers])
    }

    def buy(Number numberInstance){
        UserNumber.create springSecurityService.currentUser, numberInstance, true
        redirect view: 'index'
    }
}
