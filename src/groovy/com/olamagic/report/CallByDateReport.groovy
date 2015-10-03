package com.olamagic.report

import com.olamagic.Call

/**
 * Created by togrul on 9/30/15.
 */
class CallByDateReport {

    def generate(){
        Call.withSession { session ->
            def q = session.createSQLQuery("select to_char(date, 'DD-MM-YYYY'), count(*) from Call GROUP BY to_char(date, 'DD-MM-YYYY')").list()
            [x:q.reverse().collect {it[0]}, y:q.reverse().collect{it[1]}]
        }
    }
}
