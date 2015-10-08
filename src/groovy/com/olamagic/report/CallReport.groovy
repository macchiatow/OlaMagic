package com.olamagic.report

import com.olamagic.Call
import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat

/**
 * Created by togrul on 9/30/15.
 */
class CallReport {

    def generate(Long rangeFrom, Long rangeTo, String detalization) {
        if (detalization == 'none') {
            Call.withSession {
                return it.createSQLQuery("select c.date as dates, n.upid, c.duration, ifnull(a.name,'undefined') from Call c INNER JOIN Number n ON c.number_id=n.id LEFT OUTER JOIN AD_SOURCE a ON n.AD_SOURCE_ID=a.id where datediff(s, '1970-01-01', date) * 1000 between $rangeFrom and $rangeTo").list()
            }
        } else if (detalization == 'hours') {
            Call.withSession { session ->
                def q = session.createSQLQuery("select a * 3600 * 1000, b from (select datediff(s, '1970-01-01', date) / (60 * 60) a, count(*) b from Call where datediff(s, '1970-01-01', date) * 1000 between $rangeFrom and $rangeTo GROUP BY datediff(s, '1970-01-01', date) / (60 * 60))").list()

                def qMap = q.collectEntries { [(new DateTime((Long)it[0])): it[1]] }

                DateTime startHour = new DateTime(rangeFrom)
                while (startHour.isBefore(rangeTo)) {
                    qMap.putIfAbsent(startHour, 0);
                    startHour = startHour.plusHours(1)
                }

                qMap = qMap.sort({ a, b -> a.key <=> b.key })

                [x: qMap.collect { it.key.toString('HH:mm') }, y: qMap.collect { it.value }]
            }
        } else {
            Call.withSession { session ->
                def q = session.createSQLQuery("select to_char(date, 'DDMMYYYY'), count(*) from Call where datediff(s, '1970-01-01', date) * 1000 between $rangeFrom and $rangeTo GROUP BY to_char(date, 'DDMMYYYY')").list()

                def f = DateTimeFormat.forPattern("ddMMyyyy");
                def qMap = q.collectEntries { [(f.parseDateTime(it[0])): it[1]] }

                DateTime startDay = new DateTime(rangeFrom)
                while (startDay.isBefore(rangeTo)) {
                    qMap.putIfAbsent(startDay, 0);
                    startDay = startDay.plusDays(1)
                }

                qMap = qMap.sort({ a, b -> a.key <=> b.key })

                [x: qMap.collect { it.key.toString(f) }, y: qMap.collect { it.value }]
            }

        }
    }
}
