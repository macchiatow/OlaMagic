/**
 * Created by togrul on 7/10/15.
 */
package com.olamagic

import grails.transaction.Transactional
import grails.converters.JSON

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

class SiteController {

    def list(Long wid){
        def workspace = Workspace.findById(wid)
        render ([sites: workspace?.sites?:[]] as JSON)
    }

    def show(Long id) {
        def site = Site.findById(id)
        render ([site: site] as JSON)
    }

	@Transactional
    def create() {
        def site =  new Site(request.JSON.site)
        def workspace = Workspace.findById(request.JSON.site.workspace)

        if (workspace == null) {
            render status: NOT_FOUND
            return
        }

        site.workspace = workspace
        workspace.addToSites(site)

        site.save flush: true
        workspace.save flush: true

        render ([site: site] as JSON)
    }

    @Transactional
    def delete(Long id){
        def site = Site.findById(id)

        if (site == null) {
            render status: NOT_FOUND
            return
        }

        site.delete flush:true
        render '{}'
    }

    @Transactional
    def update(Long id) {
        def site = Site.findById(id)

        if (site == null) {
            render status: NOT_FOUND
            return
        }

        site.name = request.JSON.site.name

        site.save flush: true
        render ([site: site] as JSON)
    }

}
