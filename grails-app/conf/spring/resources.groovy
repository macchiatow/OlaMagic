import com.olamagic.marshaller.*
import com.olamagic.util.ObjectMarshallers
import grails.plugin.springsecurity.rest.token.generation.jwt.ShortJwtTokenGenerator
import grails.plugin.springsecurity.rest.token.storage.jwt.UserAwareJwtTokenStorageService

// Place your Spring DSL code here
beans = {

    def jwtConfig = application.config.grails.plugin.springsecurity.rest.token.storage.jwt

    customObjectMarshallers( ObjectMarshallers ) {
        marshallers = [
                new WorkspaceMarshaller(),
                new UserMarshaller(),
                new SiteMarshaller(),
                new NumberMarshaller(),
                new CallMarshaller(),
                new AdSourceMarshaller(),
                new CampaignMarshaller()
        ]
    }

    tokenStorageService(UserAwareJwtTokenStorageService) {
        jwtService = ref('jwtService')
    }

    tokenGenerator(ShortJwtTokenGenerator) {
        jwtTokenStorageService = ref('tokenStorageService')
        jwtSecret = jwtConfig.secret
        defaultExpiration = jwtConfig.expiration
    }

}
