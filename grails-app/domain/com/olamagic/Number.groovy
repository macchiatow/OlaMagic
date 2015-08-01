package com.olamagic

class Number {

    String upid

    Workspace workspace

    AdSource adSource

    Campaign campaign

    static hasMany = [calls: Call]

    static transients = ['calls']

    static constraints = {
        upid unique: true, nullable: false
        workspace nullable: true
        adSource nullable: true
        campaign nullable: true
    }

    @Override
    int hashCode() {
        upid?.hashCode() ?: 0
    }

    @Override
    boolean equals(other) {
        is(other) || (other instanceof Number && other.upid == upid)
    }
}
