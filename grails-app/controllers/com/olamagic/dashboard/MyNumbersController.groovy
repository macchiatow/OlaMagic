package com.olamagic.dashboard

import com.olamagic.Number
import com.olamagic.join.UserNumber


class MyNumbersController {

    def index() {
        def availableNumbers =  Number.list().findAll( { !UserNumber.all.number.id.contains(it.id) })
        render(view: 'index', model: [availableNumbers: availableNumbers])
    }

    def buy(){
        println params['numbers']
        redirect view: 'index'
    }
}
