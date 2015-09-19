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
        if(params.availableOnly){
            render([numbers: Number.findAllByWorkspaceIsNull()] as JSON)
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
        def workspace = Workspace.findById(request.JSON.number.owner)

        if (number == null) {
            render status: NOT_FOUND
            return
        }

        number.workspace = workspace;
        workspace.addToMyNumbers(number)
        number.save flush: true
        workspace.save flush: true

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
