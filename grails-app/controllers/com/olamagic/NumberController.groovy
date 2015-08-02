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
        params.max = Math.min(max ?: 10, 100)
        render ([numbers: Number.list(params)] as JSON)
    }

    def buy(Long wid, String upid){
        def number = Number.findByUpidAndWorkspaceIsNull(upid)
        def workspace = Workspace.findById(wid)

        if (number == null || workspace == null) {
            render status: NOT_FOUND
            return
        }

        number.workspace = workspace

        number.save flush: true

        render ([number: number] as JSON)
    }

    def release(String upid){
        def number = Number.findByUpid(upid)

        if (number == null) {
            render status: NOT_FOUND
            return
        }

        def workspace = number.workspace
        workspace.myNumbers.remove number
        number.workspace = null

        number.save flush: true

        render ([number: number] as JSON)
    }

    def listMyNumbers(Long wid){
        def workspace = Workspace.findById(wid)

        if (workspace == null) {
            render status: NOT_FOUND
            return
        }

        render ([numbers: workspace.myNumbers] as JSON)
    }

    @Transactional
    def create() {
        def number = new Number(request.JSON.number).save flush: true
        render ([number: number] as JSON)
    }

    @Transactional
    def delete(String upid){
        def number = Number.findByUpid(upid)

        if (number == null) {
            render status: NOT_FOUND
            return
        }

        number.delete flush:true
        render status: OK
    }

}
