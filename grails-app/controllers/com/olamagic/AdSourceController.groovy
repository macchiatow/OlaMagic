/**
 * Created by togrul on 7/10/15.
 */
package com.olamagic

import grails.transaction.Transactional
import grails.converters.JSON

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

class AdSourceController {

    def list(Long sid){
        def site = Site.findById(sid)

        if (site == null) {
            render status: NOT_FOUND
            return
        }

        render ([adSources: site.adSources] as JSON)
    }

    @Transactional
    def create(Long sid) {
        def adSource =  new AdSource(request.JSON.adSource)
        def site = Site.findById(sid)

        if (site == null) {
            render status: NOT_FOUND
            return
        }

        adSource.site = site

        adSource.save flush: true
        render ([adSource: adSource] as JSON)
    }

    @Transactional
    def delete(Long id) {
        def adSource = AdSource.findById(id)

        if (adSource == null) {
            render status: NOT_FOUND
            return
        }

        adSource.delete flush: true
        render status: OK
    }

    @Transactional
    def update(Long id) {
        def adSource = AdSource.findById(id)

        if (adSource == null) {
            render status: NOT_FOUND
            return
        }

        adSource.description = request.JSON.adSource.description
        adSource.name = request.JSON.adSource.name

        adSource.save flush: true
        render ([adSource: adSource] as JSON)
    }

}
