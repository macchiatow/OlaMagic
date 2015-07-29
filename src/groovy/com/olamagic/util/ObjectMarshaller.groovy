package com.olamagic.util

/**
 * Created by togrul on 7/29/15.
 */
class ObjectMarshallers {

        def marshallers = []

        def register() {
            marshallers.each{ it.register() }
        }

}
