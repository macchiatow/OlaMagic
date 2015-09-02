import com.olamagic.Number
import com.olamagic.Profile
import com.olamagic.Site
import com.olamagic.Workspace
import com.olamagic.auth.SecRole
import com.olamagic.auth.SecUser
import com.olamagic.auth.SecUserSecRole
import grails.converters.JSON

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
        def adminRole = SecRole.findByAuthority('ROLE_ADMIN') ?: new SecRole(authority: 'ROLE_ADMIN').save(failOnError: true)

        def adminUser = SecUser.findByEmail('cmeisters@gmail.com') ?:
                new SecUser(
                    email: 'cmeisters@gmail.com',
                    password: 'admin',
                    enabled: true,
                    profile: new Profile()).save(failOnError: true)

        if (!adminUser.authorities.contains(adminRole)) {
            SecUserSecRole.create adminUser, adminRole
        }

    }
}
