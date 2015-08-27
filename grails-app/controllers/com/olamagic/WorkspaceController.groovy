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

    def show(Long id) {
        def workspace = Workspace.findAllById(id)
        render ([workspace: workspace] as JSON)
    }

    def create(){
        if (request.JSON.workspace == null || request.JSON.workspace.owner == null) {
            render status: NOT_ACCEPTABLE
            return
        }

        def workspace = new Workspace()
        Profile.findById(request.JSON.workspace.owner).addToWorkspacesOwning(workspace)
        workspace.title = workspace.title?: "Workspace ${10000 + new Random().nextInt(89999)}"
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
        render '{}'
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

        WorkspaceContributor.create workspace, user.profile, true

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

        WorkspaceContributor.remove(workspace, user.profile, true)

        render ([workspace: workspace] as JSON)
    }

    def changeOwner(Long uid, Long wid) {
        def workspace = Workspace.findById(wid)
        def newUser = Profile.findById(uid)

        if (workspace == null || newUser == null) {
            render status: NOT_FOUND
            return
        }

        if (workspace.owner == newUser) {
            render status: NOT_ACCEPTABLE
            return
        }

        def oldUser = workspace.owner
        
        newUser.addToWorkspacesOwning workspace
        oldUser.removeFromWorkspacesOwning workspace
        workspace.owner = newUser

        newUser.save flush: true
        oldUser.save flush: true

        WorkspaceContributor.remove workspace, newUser, true

        render ([workspace: workspace] as JSON)
    }

    def options = {
        response.setHeader("Allow", "GET, POST, DELETE, OPTIONS")
    }

}
