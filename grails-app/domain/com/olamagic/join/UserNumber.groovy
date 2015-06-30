package com.olamagic.join

import com.olamagic.Number
import com.olamagic.auth.SecUser
import grails.gorm.DetachedCriteria
import org.apache.commons.lang.builder.HashCodeBuilder

class UserNumber implements Serializable {


    private static final long serialVersionUID = 1

    SecUser secUser
    Number number

    UserNumber(SecUser u, Number r) {
        super()
        secUser = u
        number = r
    }

    @Override
    boolean equals(other) {
        if (!(other instanceof UserNumber)) {
            return false
        }

        other.secUser?.id == secUser?.id && other.number?.id == number?.id
    }

    @Override
    int hashCode() {
        def builder = new HashCodeBuilder()
        if (secUser) builder.append(secUser.id)
        if (number) builder.append(number.id)
        builder.toHashCode()
    }

    static UserNumber get(long secUserId, long numberId) {
        criteriaFor(secUserId, numberId).get()
    }

    static boolean exists(long secUserId, long numberId) {
        criteriaFor(secUserId, numberId).count()
    }

    private static DetachedCriteria criteriaFor(long secUserId, long numberId) {
        UserNumber.where {
            secUser == SecUser.load(secUserId) &&
                    number == Number.load(numberId)
        }
    }

    static UserNumber create(SecUser secUser, Number number, boolean flush = false) {
        def instance = new UserNumber(secUser, number)
        instance.save(flush: flush, insert: true)
        instance
    }

    static boolean remove(SecUser u, Number r, boolean flush = false) {
        if (u == null || r == null) return false

        int rowCount = UserNumber.where { secUser == u && number == r }.deleteAll()

        if (flush) { UserNumber.withSession { it.flush() } }

        rowCount
    }

    static void removeAll(SecUser u, boolean flush = false) {
        if (u == null) return

        UserNumber.where { secUser == u }.deleteAll()

        if (flush) { UserNumber.withSession { it.flush() } }
    }

    static void removeAll(Number r, boolean flush = false) {
        if (r == null) return

        UserNumber.where { number == r }.deleteAll()

        if (flush) { UserNumber.withSession { it.flush() } }
    }

    static constraints = {
        number validator: { Number r, UserNumber ur ->
            if (ur.secUser == null || ur.secUser.id == null) return
            boolean existing = false
            UserNumber.withNewSession {
                existing = UserNumber.exists(ur.secUser.id, r.id)
            }
            if (existing) {
                return 'userRole.exists'
            }
        }
    }

    static mapping = {
        id composite: ['secUser', 'number']
        version false
    }
}
