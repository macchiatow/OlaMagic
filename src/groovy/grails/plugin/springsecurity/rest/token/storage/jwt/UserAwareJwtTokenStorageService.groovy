/*
 * Copyright 2015 Togrul Mageramov <cmeisters@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package grails.plugin.springsecurity.rest.token.storage.jwt
import com.nimbusds.jose.JOSEException
import com.nimbusds.jwt.JWT
import com.olamagic.auth.SecUser
import grails.plugin.springsecurity.rest.JwtService
import grails.plugin.springsecurity.rest.token.storage.TokenNotFoundException
import groovy.util.logging.Slf4j
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails

import java.text.ParseException
/**
 * Re-hydrates JWT's with HMAC protection or JWE encryption
 */
@Slf4j
class UserAwareJwtTokenStorageService extends JwtTokenStorageService {

    JwtService jwtService

    @Override
    UserDetails loadUserByToken(String tokenValue) throws TokenNotFoundException {
        try {
            JWT jwt = jwtService.parse(tokenValue)

            verifyExpiration(jwt.JWTClaimsSet.expirationTime, tokenValue)
            verifyUserDetailsLastModified(jwt, tokenValue)

            def roles = jwt.JWTClaimsSet.getStringArrayClaim('roles')?.collect { new SimpleGrantedAuthority(it) }

            return new User(jwt.JWTClaimsSet.subject, '[PROTECTED]', roles)

        } catch (ParseException pe) {
            throw new TokenNotFoundException("Token ${tokenValue} is not valid")
        } catch (JOSEException je) {
            throw new TokenNotFoundException("Token ${tokenValue} has an invalid signature")
        }
    }

    private verifyExpiration(Date expirationTime, String tokenValue){
        if (expirationTime?.before(new Date())) {
            throw new TokenNotFoundException("Token ${tokenValue} has expired")
        }
        log.debug "Successfully verified JWT expiration"
    }

    private verifyUserDetailsLastModified(JWT jwt, String tokenValue){
        SecUser.withNewSession {
            if (SecUser.findByEmail(jwt.JWTClaimsSet.subject).lastModified.after(jwt.JWTClaimsSet.issueTime)) {
                throw new TokenNotFoundException("Token ${tokenValue} issued before user details last modified")
            }
        }
        log.debug "Successfully verified JWT issueTime"
    }

}
