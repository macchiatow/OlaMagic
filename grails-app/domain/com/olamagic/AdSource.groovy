package com.olamagic

import com.olamagic.auth.SecUser

class AdSource {

    String name

    String description

    static belongsTo = [site: Site]

    static constraints = {
    }
}
