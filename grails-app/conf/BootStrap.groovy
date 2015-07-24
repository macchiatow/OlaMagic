import com.olamagic.Number
import com.olamagic.Profile
import com.olamagic.Site
import com.olamagic.auth.SecRole
import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole
import grails.converters.JSON

class BootStrap {

    def springSecurityService

    def init = { servletContext ->
        def adminRole = SecRole.findByAuthority('ROLE_ADMIN') ?: new SecRole(authority: 'ROLE_ADMIN').save(failOnError: true)
        SecRole.findByAuthority('ROLE_USER') ?: new SecRole(authority: 'ROLE_USER').save(failOnError: true)
        SecRole.findByAuthority('ROLE_API_USER') ?: new SecRole(authority: 'ROLE_API_USER').save(failOnError: true)

        def adminUser = SecUser.findByUid('admin') ?: new SecUser(
                uid: 'admin',
                password: 'admin',
                enabled: true,
                profile: new Profile()).save(failOnError: true)

        if (!adminUser.authorities.contains(adminRole)) {
            SecUserSecRole.create adminUser, adminRole
        }

        JSON.registerObjectMarshaller(SecUser) { SecUser u ->
            return [
                    uid            : u.uid,
                    accountExpired : u.accountExpired,
                    accountLocked  : u.accountLocked,
                    enabled        : u.enabled,
                    passwordExpired: u.passwordExpired,
                    authorities    : u.authorities*.authority,
                    class          : u.class
            ]
        }

        JSON.registerObjectMarshaller(Site) { Site s ->
            return [
                    details        : s.details,
                    username       : s.name,
                    class          : s.class
            ]
        }

        JSON.registerObjectMarshaller(Number) { Number u ->
            return [
                    id  : u.id,
                    upid: u.upid
            ]
        }
    }
    def destroy = {
    }
}
