package com.olamagic.join

import com.olamagic.AdSource
import com.olamagic.auth.SecUser
import grails.gorm.DetachedCriteria
import org.apache.commons.lang.builder.HashCodeBuilder

class UserAdSource implements Serializable {


    private static final long serialVersionUID = 1

    SecUser secUser
    AdSource adSource

    UserAdSource(SecUser u, AdSource r) {
        super()
        secUser = u
        adSource = r
    }

    @Override
    boolean equals(other) {
        if (!(other instanceof UserAdSource)) {
            return false
        }

        other.secUser?.id == secUser?.id && other.adSource?.id == adSource?.id
    }

    @Override
    int hashCode() {
        def builder = new HashCodeBuilder()
        if (secUser) builder.append(secUser.id)
        if (adSource) builder.append(adSource.id)
        builder.toHashCode()
    }

    static UserAdSource get(long secUserId, long adSourceId) {
        criteriaFor(secUserId, adSourceId).get()
    }

    static boolean exists(long secUserId, long adSourceId) {
        criteriaFor(secUserId, adSourceId).count()
    }

    private static DetachedCriteria criteriaFor(long secUserId, long adSourceId) {
        UserAdSource.where {
            secUser == SecUser.load(secUserId) &&
                    adSource == AdSource.load(adSourceId)
        }
    }

    static UserAdSource create(SecUser secUser, AdSource adSource, boolean flush = false) {
        def instance = new UserAdSource(secUser, adSource)
        instance.save(flush: flush, insert: true)
        instance
    }

    static boolean remove(SecUser u, AdSource r, boolean flush = false) {
        if (u == null || r == null) return false

        int rowCount = UserAdSource.where { secUser == u && adSource == r }.deleteAll()

        if (flush) { UserAdSource.withSession { it.flush() } }

        rowCount
    }

    static void removeAll(SecUser u, boolean flush = false) {
        if (u == null) return

        UserAdSource.where { secUser == u }.deleteAll()

        if (flush) { UserAdSource.withSession { it.flush() } }
    }

    static void removeAll(AdSource r, boolean flush = false) {
        if (r == null) return

        UserAdSource.where { adSource == r }.deleteAll()

        if (flush) { UserAdSource.withSession { it.flush() } }
    }

    static constraints = {
        adSource validator: { AdSource r, UserAdSource ur ->
            if (ur.secUser == null || ur.secUser.id == null) return
            boolean existing = false
            UserAdSource.withNewSession {
                existing = UserAdSource.exists(ur.secUser.id, r.id)
            }
            if (existing) {
                return 'userRole.exists'
            }
        }
    }

    static mapping = {
        id composite: ['secUser', 'adSource']
        version false
    }
}
