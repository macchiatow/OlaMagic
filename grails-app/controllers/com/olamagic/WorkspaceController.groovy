package com.olamagic
import com.olamagic.auth.SecUser
import grails.transaction.Transactional

import static com.olamagic.util.JsonWrapper.toJson
import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

/**
 * Created by togrul on 7/10/15.
 */
class WorkspaceController {

    static responseFormats = ['json']

    def settings(){

    }

    def access(){

    }

    def list(Long uid) {
        def workspaces = Workspace.findAllByOwner(Profile.findBySecUser(SecUser.findById(uid)))
        render toJson('workspaces', workspaces)
    }

    def create(Long uid){
        def workspace =  new Workspace(request.JSON)
        workspace.owner = Profile.findBySecUser(SecUser.findById(uid))
        workspace.save flush: true
        render toJson('workspace', workspace)
    }

    def update(){

    }

    @Transactional
    def delete(Long id) {
        def workspace = Workspace.findById(id)

        if (workspace == null) {
            render status: NOT_FOUND
            return
        }

        if (workspace.owner.workspaces.size() < 2) {
            render status: NOT_ACCEPTABLE
            return
        }

        workspace.delete flush: true
        render status: OK
    }


    def subscribe(){

    }

    def unsubscribe(){

    }

}
