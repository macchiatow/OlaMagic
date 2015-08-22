package com.olamagic

import grails.gorm.DetachedCriteria
import org.apache.commons.lang.builder.HashCodeBuilder

/**
 * Created by togrul on 8/21/15.
 */
class WorkspaceContributor implements Serializable {

    private static final long serialVersionUID = 1

    Workspace workspace
    Profile profile

    WorkspaceContributor(Workspace w, Profile p) {
        super()
        workspace = w
        profile = p
    }

    @Override
    boolean equals(other) {
        if (!(other instanceof WorkspaceContributor)) {
            return false
        }

        other.workspace?.id == workspace?.id && other.profile?.id == profile?.id
    }

    @Override
    int hashCode() {
        def builder = new HashCodeBuilder()
        if (workspace) builder.append(workspace.id)
        if (profile) builder.append(profile.id)
        builder.toHashCode()
    }

    static WorkspaceContributor get(long workspaceId, long profileId) {
        criteriaFor(workspaceId, profileId).get()
    }

    static boolean exists(long workspaceId, long profileId) {
        criteriaFor(workspaceId, profileId).count()
    }

    private static DetachedCriteria criteriaFor(long workspaceId, long profileId) {
        WorkspaceContributor.where {
            workspace == Workspace.load(workspaceId) &&
                    profile == Profile.load(profileId)
        }
    }

    static WorkspaceContributor create(Workspace workspace, Profile profile, boolean flush = false) {
        def instance = new WorkspaceContributor(workspace, profile)
        instance.save(flush: flush, insert: true)
        instance
    }

    static boolean remove(Workspace u, Profile r, boolean flush = false) {
        if (u == null || r == null) return false

        int rowCount = WorkspaceContributor.where { workspace == u && profile == r }.deleteAll()

        if (flush) { WorkspaceContributor.withSession { it.flush() } }

        rowCount
    }

    static void removeAll(Workspace u, boolean flush = false) {
        if (u == null) return

        WorkspaceContributor.where { workspace == u }.deleteAll()

        if (flush) { WorkspaceContributor.withSession { it.flush() } }
    }

    static void removeAll(Profile r, boolean flush = false) {
        if (r == null) return

        WorkspaceContributor.where { profile == r }.deleteAll()

        if (flush) { WorkspaceContributor.withSession { it.flush() } }
    }

    static constraints = {
        profile validator: { Profile r, WorkspaceContributor ur ->
            if (ur.workspace == null || ur.workspace.id == null) return
            boolean existing = false
            WorkspaceContributor.withNewSession {
                existing = WorkspaceContributor.exists(ur.workspace.id, r.id)
            }
            if (existing) {
                return 'userRole.exists'
            }
        }
    }

    static mapping = {
        id composite: ['workspace', 'profile']
        version false
    }

}
