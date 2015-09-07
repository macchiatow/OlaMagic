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
package grails.plugin.springsecurity.rest.token.generation.jwt

import com.nimbusds.jwt.JWTClaimsSet
import grails.plugin.springsecurity.rest.token.AccessToken
import groovy.time.TimeCategory
import groovy.util.logging.Slf4j
import org.springframework.security.core.userdetails.UserDetails
/**
 * Generates JWT's protected using HMAC with SHA-256
 */
@Slf4j
class ShortJwtTokenGenerator extends SignedJwtTokenGenerator {

    @Override
    AccessToken generateAccessToken(UserDetails details, boolean withRefreshToken, Integer expiration = this.defaultExpiration) {
        log.debug "Serializing the principal received"

        JWTClaimsSet claimsSet = generateClaims(details, expiration)

        log.debug "Generating access token..."
        String accessToken = generateAccessToken(claimsSet)

        String refreshToken
        if (withRefreshToken) {
            log.debug "Generating refresh token..."
            claimsSet.expirationTime = null
            refreshToken =  generateAccessToken(claimsSet)
        }

        return new AccessToken(details, details.authorities, accessToken, refreshToken, expiration)
    }

    JWTClaimsSet generateClaims(UserDetails details, Integer expiration) {
        JWTClaimsSet claimsSet = new JWTClaimsSet()
        claimsSet.setSubject(details.username)

        log.debug "Setting expiration to ${expiration}"
        Date now = new Date()
        claimsSet.setIssueTime(now)
        use(TimeCategory) {
            claimsSet.setExpirationTime(now + expiration.seconds)
        }

        claimsSet.setCustomClaim('roles', details.authorities?.collect { it.authority })

        log.debug "Generated claim set: ${claimsSet.toJSONObject().toString()}"
        return claimsSet
    }

}
