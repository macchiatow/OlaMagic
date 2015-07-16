import com.olamagic.Number
import com.olamagic.auth.*
import grails.converters.JSON

class BootStrap {

    def springSecurityService

    def init = { servletContext ->
        def adminRole = SecRole.findByAuthority('ROLE_ADMIN') ?: new SecRole(authority: 'ROLE_ADMIN').save(failOnError: true)
        SecRole.findByAuthority('ROLE_USER') ?: new SecRole(authority: 'ROLE_USER').save(failOnError: true)
        SecRole.findByAuthority('ROLE_API_USER') ?: new SecRole(authority: 'ROLE_API_USER').save(failOnError: true)

        def adminUser = SecUser.findByUid('admin') ?: new SecUser(
                username: 'admin',
                password: 'admin',
                enabled: true).save(failOnError: true)

        if (!adminUser.authorities.contains(adminRole)) {
            SecUserSecRole.create adminUser, adminRole
        }

        JSON.registerObjectMarshaller( SecUser ) {SecUser u ->
            return [
                    uid : u.uid,
                    accountExpired : u.accountExpired,
                    accountLocked : u.accountLocked,
                    enabled : u.enabled,
                    passwordExpired : u.passwordExpired,
                    authorities : u.authorities*.authority,
                    class : u.class
            ]
        }

        JSON.registerObjectMarshaller( Number ) {Number u ->
            return [
                    id : u.id,
                    upid : u.upid
            ]
        }
    }
    def destroy = {
    }
}
