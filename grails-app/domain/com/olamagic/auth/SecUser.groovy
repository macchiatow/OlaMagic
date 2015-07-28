package com.olamagic.auth

import com.olamagic.Profile
import grails.converters.JSON

class SecUser implements Serializable {

	private static final long serialVersionUID = 1

	transient springSecurityService

	String email
	String password
	boolean enabled = true
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired
    List<String> _authorities

    static hasOne = [profile: Profile]

    SecUser(String email, String password) {
        super()
		this.email = email
		this.password = password
	}

	@Override
	int hashCode() {
		email?.hashCode() ?: 0
	}

	@Override
	boolean equals(other) {
		is(other) || (other instanceof SecUser && other.email == email)
	}

	@Override
	String toString() {
		email
	}

	Set<SecRole> getAuthorities() {
		SecUserSecRole.findAllBySecUser(this)*.secRole
	}

    def saveWithAuthorities(){
        this.save()

        this.authorities?.authority.findAll { !_authorities?.contains(it) }.each {
            println "revoking $it"
            SecUserSecRole.findBySecUserAndSecRole(this, SecRole.findByAuthority(it)).delete(flush: true)
        }

        _authorities?.findAll { !this.authorities?.authority.contains(it) }.each {
            println "granding $it"
            SecUserSecRole.create this, SecRole.findByAuthority(it), true
        }
    }

    def beforeValidate() {
        if (profile == null) {
            profile = new Profile()
        }
    }

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
	}

	static transients = ['springSecurityService', '_authorities']

	static constraints = {
		email blank: false, unique: true
		password blank: false
	}

	static mapping = {
		password column: '`password`'
	}

    static {
        JSON.registerObjectMarshaller(SecUser) { SecUser u ->
            return [
                    email          : u.email,
                    id             : u.id,
                    accountExpired : u.accountExpired,
                    accountLocked  : u.accountLocked,
                    enabled        : u.enabled,
                    passwordExpired: u.passwordExpired,
                    authorities    : u.authorities*.authority,
            ]
        }
    }
}
