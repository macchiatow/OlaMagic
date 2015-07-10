package com.olamagic

/**
 * Created by togrul on 7/10/15.
 */
class SiteController {

    def list(Integer max){
        params.max = Math.min(max ?: 10, 100)
        respond Number.list(params), model:[numberInstanceCount: Number.count()]
    }

}
