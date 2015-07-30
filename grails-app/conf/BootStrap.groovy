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

        customObjectMarshallers.register()
    }
    def destroy = {
    }
}
