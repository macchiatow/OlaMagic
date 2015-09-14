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
    Date lastModified = new Date()

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

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
        lastModified = new Date()
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
	}

	static transients = ['springSecurityService']

	static constraints = {
		email blank: false, unique: true
		password blank: false
	}

	static mapping = {
		password column: '`password`'
	}

}
