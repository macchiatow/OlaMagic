package com.olamagic
import com.olamagic.auth.SecUser
import grails.transaction.Transactional
import grails.converters.JSON

import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

/**
 * Created by togrul on 7/10/15.
 */
class WorkspaceController {

    static responseFormats = ['json']

    def list(Long uid) {
        def workspaces = Workspace.findAllByOwner(Profile.findBySecUser(SecUser.findById(uid)))
        render ([workspaces: workspaces] as JSON)
    }

    def create(Long uid){
        def workspace =  new Workspace(request.JSON.workspace)
        workspace.owner = Profile.findBySecUser(SecUser.findById(uid))
        workspace.save flush: true
        render ([workspace: workspace] as JSON)
    }

    def update(Long id){
        def workspace = Workspace.findById(id)

        if (workspace == null) {
            render status: NOT_FOUND
            return
        }

        workspace.title = request.JSON.workspace.title
        workspace.save flush: true
        render ([workspace: workspace] as JSON)
    }

    @Transactional
    def delete(Long id) {
        def workspace = Workspace.findById(id)

        if (workspace == null) {
            render status: NOT_FOUND
            return
        }

        if (Workspace.findAllByOwner(workspace.owner).size() < 2) {
            render status: NOT_ACCEPTABLE
            return
        }

        workspace.delete flush: true
        render status: OK
    }


    def subscribe(Long uid, Long wid) {
        def workspace = Workspace.findById(wid)
        def user = SecUser.findById(uid)

        if (workspace == null || user == null) {
            render status: NOT_FOUND
            return
        }

        if (workspace.owner == user.profile) {
            render status: NOT_ACCEPTABLE
            return
        }

        user.profile.workspaces << workspace       
        workspace.contributors << user.profile 

        user.save flush: true

        render ([workspace: workspace] as JSON)
    }

    def unsubscribe(Long uid, Long wid) {
        def workspace = Workspace.findById(wid)
        def user = SecUser.findById(uid)

        if (workspace == null || user == null) {
            render status: NOT_FOUND
            return
        }

        if (workspace.owner == user.profile) {
            render status: NOT_ACCEPTABLE
            return
        }

        user.profile.workspaces.remove workspace
        workspace.contributors.remove user.profile

        user.save flush: true

        render ([workspace: workspace] as JSON)
    }

    def changeOwner(Long uid, Long wid) {
        def workspace = Workspace.findById(wid)
        def newUser = SecUser.findById(uid)

        if (workspace == null || newUser == null) {
            render status: NOT_FOUND
            return
        }

        if (workspace.owner == newUser.profile) {
            render status: NOT_ACCEPTABLE
            return
        }

        def oldUser = workspace.owner.secUser
        
        newUser.profile.workspaces.add workspace
        oldUser.profile.workspaces.remove workspace
        workspace.owner = newUser.profile

        newUser.save flush: true
        oldUser.save flush: true

        render ([workspace: workspace] as JSON)
    }

}
