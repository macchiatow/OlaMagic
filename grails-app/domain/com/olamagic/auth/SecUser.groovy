package com.olamagic.auth

import com.olamagic.join.UserNumber

class SecUser implements Serializable {

	private static final long serialVersionUID = 1

	transient springSecurityService

	String uid
	String password
	boolean enabled = true
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired

    List roles = ['ROLE_AMIND']

	SecUser(String uid, String password) {
        super()
		this.uid = uid
		this.password = password
	}

	@Override
	int hashCode() {
		uid?.hashCode() ?: 0
	}

	@Override
	boolean equals(other) {
		is(other) || (other instanceof SecUser && other.uid == uid)
	}

	@Override
	String toString() {
		uid
	}

	Set<SecRole> getAuthorities() {
		SecUserSecRole.findAllBySecUser(this)*.secRole
	}

    Set<SecRole> getMyNumbers() {
        UserNumber.findAllBySecUser(this)*.number
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

	static transients = ['springSecurityService', 'roles']

	static constraints = {
		uid blank: false, unique: true
		password blank: false
	}

	static mapping = {
		password column: '`password`'
	}
}
