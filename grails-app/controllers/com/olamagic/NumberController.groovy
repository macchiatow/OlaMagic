package com.olamagic

import com.olamagic.auth.SecUser
import grails.converters.JSON


import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class NumberController {

    //static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    static responseFormats = ['json']

    def list(Integer max){
        if (params.upid) {
            render([numbers: Number.createCriteria().list({ like("upid", "%${params.upid}%") })] as JSON)
            return
        }
        if (params.workspace && !params.adsource){
            def workspace = Workspace.findById(params.workspace)
            render([numbers: Number.findAllByWorkspaceAndAdSourceIsNull(workspace)] as JSON)
            return
        }
        if(params.availableOnly){
            render([numbers: Number.findAllByWorkspaceIsNullAndAdSourceIsNull()] as JSON)
            return
        }
        params.max = Math.min(max ?: 10, 100)
        render ([numbers: Number.list(params)] as JSON)
    }

    def show(Long id) {
        def number = Number.findById(id)

        if (number == null) {
            render status: NOT_FOUND
            return
        }

        render ([number: number] as JSON)
    }

    @Transactional
    def update(Long id){
        def number = Number.findById(id)

        if (number == null) {
            render status: NOT_FOUND
            return
        }

        def workspace
        def adSource

        if (request.JSON.number.owner){
            workspace = Workspace.findById(request.JSON.number.owner)
            number.workspace = workspace;
            workspace.addToMyNumbers(number)
        } else {
            workspace = number.workspace
            workspace.removeFromMyNumbers(number)
            number.forwardTo = null;
            number.workspace = null;
        }

        if (request.JSON.number.adsource){
            adSource = AdSource.findById(request.JSON.number.adsource)
            number.adSource = adSource;
            adSource.addToNumbers(number)
        } else {
            adSource = number.adSource
            adSource.removeFromNumbers(number)
        }

        number.forwardTo = request.JSON.number.forwardTo
        number.save flush: true
        workspace.save flush: true
        adSource.save flush: true

        render ([number: number] as JSON)
    }

    @Transactional
    def create() {
        def number = new Number(request.JSON.number).save flush: true
        render ([number: number] as JSON)
    }

    @Transactional
    def delete(Long id){
        def number = Number.findById(id)

        if (number == null) {
            render status: NOT_FOUND
            return
        }

        number.delete flush:true
        render '{}'
    }

}
