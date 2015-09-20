import com.olamagic.Profile
import com.olamagic.auth.SecRole
import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole

class BootStrap {

    def springSecurityService

    def customObjectMarshallers

    def init = { servletContext ->

        initAdminUserAndRoles()
        customObjectMarshallers.register()
    }

    def destroy = {}

    def initAdminUserAndRoles(){
        SecRole.findByAuthority('ROLE_USER') ?: new SecRole(authority: 'ROLE_USER').save(failOnError: true)
        def externalRole = SecRole.findByAuthority('ROLE_EXTERNAL') ?: new SecRole(authority: 'ROLE_EXTERNAL').save(failOnError: true)
        def adminRole = SecRole.findByAuthority('ROLE_ADMIN') ?: new SecRole(authority: 'ROLE_ADMIN').save(failOnError: true)

        def adminUser = SecUser.findByEmail('cmeisters@gmail.com') ?:
                new SecUser(
                    email: 'cmeisters@gmail.com',
                    password: 'admin',
                    enabled: true,
                    profile: new Profile()).save(failOnError: true)

        def externalUser = SecUser.findByEmail('external@olamagic.az') ?:
                new SecUser(
                        email: 'external@olamagic.az',
                        password: 'external',
                        enabled: true,
                        profile: new Profile()).save(failOnError: true)

        if (!externalUser.authorities.contains(externalRole)) {
            SecUserSecRole.create externalUser, externalRole
        }

        if (!adminUser.authorities.contains(adminRole)) {
            SecUserSecRole.create adminUser, adminRole
        }

    }
}
