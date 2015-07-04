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

    def updateAuthorities(def newAuthorities){
        this.authorities.authority.findAll { !newAuthorities.contains(it) }.each {
            println "revoking $it"
            SecUserSecRole.findBySecUserAndSecRole(this, SecRole.findByAuthority(it)).delete(flush: true)
        }

        newAuthorities.findAll { !this.authorities.authority.contains(it) }.each {
            println "granding $it"
            SecUserSecRole.create this, SecRole.findByAuthority(it), true
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

	static transients = ['springSecurityService']

	static constraints = {
		uid blank: false, unique: true
		password blank: false
	}

	static mapping = {
		password column: '`password`'
	}
}
