package com.olamagic

import com.olamagic.auth.SecUser

/**
 * Created by togrul on 9/2/15.
 */
class IndexController {

    def springSecurityService

    def index() {
        [user: SecUser.findByEmail(springSecurityService.currentUser)]
    }

}
