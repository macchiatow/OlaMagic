package com.olamagic.util

import grails.converters.JSON

/**
 * Created by togrul on 7/25/15.
 */
class JsonWrapper {

    static toJson = { def key, def value ->
        "{\"$key\" : ${value as JSON}}"
    }
}
