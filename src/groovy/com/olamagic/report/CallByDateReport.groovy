package com.olamagic.report

import com.olamagic.Call
import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat

/**
 * Created by togrul on 9/30/15.
 */
class CallByDateReport {

    def generate(){
        Call.withSession { session ->
            def q = session.createSQLQuery("select to_char(date, 'DDMMYYYY'), count(*) from Call GROUP BY to_char(date, 'DDMMYYYY')").list()

            def f = DateTimeFormat.forPattern("ddMMyyyy");
            def qMap = q.collectEntries { [(f.parseDateTime(it[0])):it[1]] }

            DateTime startDay = new DateTime().minusDays(7).withMillisOfDay(0)
            while (startDay.beforeNow) {
                startDay = startDay.plusDays(1)
                qMap.putIfAbsent(startDay, 0);
            }

            qMap = qMap.sort({ a, b -> a.key <=> b.key })

            [x:qMap.collect {it.key.toString(f)}, y:qMap.collect{it.value}]
        }
    }
}
