package com.olamagic.marshaller

import com.olamagic.Workspace
import grails.converters.JSON

/**
 * Created by togrul on 7/29/15.
 */
class WorkspaceMarshaller {

    void register(){
        JSON.registerObjectMarshaller(Workspace) { Workspace w ->
            return [
                    id              : w.id,
                    title           : w.title,
                    owner           : w.owner.secUser.email,
                    contributors    : w.contributors?.secUser?.email?: [],
                    contributorIds  : w.contributors?.secUser?.id?: [],
                    numbersCount    : w.myNumbers?.size()?: 0,
                    sitesCount      : w.sites?.size()?: 0,
                    adSourcesCount  : w.sites?.adSources?.size()?: 0,
                    campaignsCount  : w.sites?.campaigns?.size()?: 0
            ]
        }
    }
}
