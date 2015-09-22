/**
 * Created by togrul on 7/10/15.
 */
package com.olamagic

import grails.transaction.Transactional
import grails.converters.JSON

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

class AdSourceController {

    def show(Long id) {
        render ([adsource: AdSource.findById(id)] as JSON)
    }

    @Transactional
    def create() {
        def adsource = new AdSource(request.JSON.adsource)
        def site = Site.findById(request.JSON.adsource.site)

        if (site == null) {
            render status: NOT_FOUND
            return
        }

        adsource.site = site
        site.addToAdSources(adsource)

        adsource.save flush: true, failOnError: true
        site.save flush: true, failOnError: true

        render ([adsource: adsource] as JSON)
    }


    @Transactional
    def delete(Long id){
        def adsource = AdSource.findById(id)

        if (adsource == null) {
            render status: NOT_FOUND
            return
        }

        adsource.delete flush:true
        render '{}'
    }

    @Transactional
    def update(Long id) {
        def adsource = AdSource.findById(id)

        if (adsource == null) {
            render status: NOT_FOUND
            return
        }

        adsource.type = request.JSON.adsource.type
        adsource.name = request.JSON.adsource.name

        adsource.save flush: true
        render ([adsource: adsource] as JSON)
    }

}
