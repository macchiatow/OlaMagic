/**
 * Created by togrul on 7/10/15.
 */
package com.olamagic

import com.olamagic.auth.SecUser
import grails.transaction.Transactional
import grails.converters.JSON

import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

class SiteController {

    def list(Long wid){
        def workspace = Workspace.findById(wid)

        if (workspace == null) {
            render status: NOT_FOUND
            return
        }

        render ([sites: workspace.sites] as JSON)
    }

	@Transactional
    def create(Long wid) {
        def site =  new Site(request.JSON.site)
        def workspace = Workspace.findById(wid)

        if (workspace == null) {
            render status: NOT_FOUND
            return
        }

        site.workspace = workspace

        site.save flush: true
        render ([site: site] as JSON)
    }

    @Transactional
    def delete(Long id) {
        def site = Site.findById(id)

        if (site == null) {
            render status: NOT_FOUND
            return
        }

        site.delete flush: true
        render status: OK
    }

    @Transactional
    def update(Long id) {
        def site = Site.findById(id)

        if (site == null) {
            render status: NOT_FOUND
            return
        }

        site.details = request.JSON.site.details
        site.name = request.JSON.site.name

        site.save flush: true
        render ([site: site] as JSON)
    }

}
