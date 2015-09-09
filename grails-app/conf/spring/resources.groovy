import com.olamagic.marshaller.*
import com.olamagic.util.ObjectMarshallers
import grails.plugin.springsecurity.rest.AccessTokenEndpointFilter
import grails.plugin.springsecurity.rest.token.generation.jwt.ShortJwtTokenGenerator
import grails.plugin.springsecurity.rest.token.rendering.AccountAccessTokenJsonRenderer
import grails.plugin.springsecurity.rest.token.storage.jwt.UserAwareJwtTokenStorageService

// Place your Spring DSL code here
beans = {

    def tokenConfig = application.config.grails.plugin.springsecurity.rest.token

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
        jwtSecret = tokenConfig.storage.jwt.secret
        defaultExpiration = tokenConfig.storage.jwt.expiration
    }

    accessTokenJsonRenderer(AccountAccessTokenJsonRenderer) {
        usernamePropertyName = tokenConfig.rendering.usernamePropertyName
        tokenPropertyName = tokenConfig.rendering.tokenPropertyName
        authoritiesPropertyName = tokenConfig.rendering.authoritiesPropertyName
        useBearerToken = tokenConfig.validation.useBearerToken
    }

    restAuthenticationFilter(AccessTokenEndpointFilter) {
        authenticationManager = ref('authenticationManager')
        authenticationSuccessHandler = ref('restAuthenticationSuccessHandler')
        authenticationFailureHandler = ref('restAuthenticationFailureHandler')
        authenticationDetailsSource = ref('authenticationDetailsSource')
        credentialsExtractor = ref('credentialsExtractor')
        endpointUrl = application.config.grails.plugin.springsecurity.rest.login.endpointUrl
        tokenGenerator = ref('tokenGenerator')
        tokenStorageService = ref('tokenStorageService')
        authenticationEventPublisher = ref('authenticationEventPublisher')
    }

}
