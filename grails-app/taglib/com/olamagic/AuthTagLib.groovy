package com.olamagic

class AuthTagLib {

    static namespace = "security"

    static defaultEncodeAs = "raw"

    def springSecurityService

    def isLoggedIn = { attrs, body ->
        if(springSecurityService.loggedIn) {
            out << body()
        }
    }
}
