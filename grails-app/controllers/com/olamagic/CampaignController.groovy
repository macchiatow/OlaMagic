/**
 * Created by togrul on 7/10/15.
 */
package com.olamagic

import grails.transaction.Transactional
import grails.converters.JSON

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

class CampaignController {

    def list(Long sid){
        def site = Site.findById(sid)

        if (site == null) {
            render status: NOT_FOUND
            return
        }

        render ([campaigns: site.campaigns] as JSON)
    }

    @Transactional
    def create(Long sid) {
        def campaign =  new Campaign(request.JSON.campaign)
        def site = Site.findById(sid)

        if (site == null) {
            render status: NOT_FOUND
            return
        }

        campaign.site = site

        campaign.save flush: true
        render ([campaign: campaign] as JSON)
    }

    @Transactional
    def delete(Long id) {
        def campaign = Campaign.findById(id)

        if (campaign == null) {
            render status: NOT_FOUND
            return
        }

        campaign.delete flush: true
        render status: OK
    }

    @Transactional
    def update(Long id) {
        def campaign = Campaign.findById(id)

        if (campaign == null) {
            render status: NOT_FOUND
            return
        }

        campaign.description = request.JSON.campaign.description
        campaign.name = request.JSON.campaign.name

        campaign.save flush: true
        render ([campaign: campaign] as JSON)
    }

    def listNumbers(Long id) {
        def campaign = Campaign.findById(id)

        if (campaign == null) {
            render status: NOT_FOUND
            return
        }

        render ([numbers: campaign.numbers] as JSON)
    }

    def addNumber(Long caid, String upid) {
        def campaign = Campaign.findById(caid)
        def number = Number.findByUpidAndWorkspace(upid, campaign?.site?.workspace)

        if (campaign == null || number == null) {
            render status: NOT_FOUND
            return
        }

        number.campaign = campaign
        number.save flush: true

        render ([campaign: campaign] as JSON)
    }

    def removeNumber(Long caid, String upid) {
        def campaign = Campaign.findById(caid)
        def number = campaign?.numbers?.find {it.upid == upid }

        if (campaign == null || number == null) {
            render status: NOT_FOUND
            return
        }

        campaign.numbers.remove number
        campaign.save flush: true

        render ([campaign: campaign] as JSON)
    }

}
