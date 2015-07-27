package com.olamagic
import com.olamagic.auth.SecUser
import com.olamagic.util.JsonWrapper

import static com.olamagic.util.JsonWrapper.toJson

/**
 * Created by togrul on 7/10/15.
 */
class WorkspaceController {

    static responseFormats = ['json']

    def settings(){

    }

    def access(){

    }

    def list(String uid) {
        def workspaces = Workspace.findAllByOwner(Profile.findBySecUser(SecUser.findByUid(uid)))
        render toJson('workspaces', workspaces)
    }

    def create(String uid){
        def instance =  new Workspace(request.JSON)
        instance.profile = Profile.findBySecUser(SecUser.findByUid(uid))

        respond instance
    }

    def update(){

    }

    def delete(){

    }

    def subscribe(){

    }

    def unsubscribe(){

    }

}
