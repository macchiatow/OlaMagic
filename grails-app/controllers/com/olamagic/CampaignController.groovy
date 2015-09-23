/**
 * Created by togrul on 7/10/15.
 */
package com.olamagic

import grails.transaction.Transactional
import grails.converters.JSON

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

class CampaignController {

    def show(Long id) {
        render ([campaign: Campaign.findById(id)] as JSON)
    }

    @Transactional
    def create() {
        def campaign = new Campaign(request.JSON.campaign)
        def site = Site.findById(request.JSON.campaign.site)

        if (site == null) {
            render status: NOT_FOUND
            return
        }

        campaign.site = site
        site.addToCampaigns(campaign)

        campaign.save flush: true, failOnError: true
        site.save flush: true, failOnError: true

        render ([campaign: campaign] as JSON)
    }


    @Transactional
    def delete(Long id){
        def campaign = Campaign.findById(id)

        if (campaign == null) {
            render status: NOT_FOUND
            return
        }

        campaign.delete flush:true
        render '{}'
    }

    @Transactional
    def update(Long id) {
        def campaign = Campaign.findById(id)

        if (campaign == null) {
            render status: NOT_FOUND
            return
        }

        campaign.name = request.JSON.campaign.name

        campaign.save flush: true
        render ([campaign: campaign] as JSON)
    }

}
