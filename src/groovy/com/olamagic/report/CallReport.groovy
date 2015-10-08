package com.olamagic.report

import com.olamagic.Call
import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat

class CallReport {

    def generate(Long rangeFrom, Long rangeTo, String detalization) {
        Call.withSession {
            if (detalization == 'hours') {
                query(it, rangeFrom, rangeTo, new DateTime(rangeFrom), 'plusHours', 'HH24 dd Mon YYYY', 'H dd MMM YYYY', 'HH:mm')

            } else if (detalization == 'months') {
                query(it, rangeFrom, rangeTo, new DateTime(rangeFrom).withDayOfMonth(1), 'plusMonths', 'Mon YYYY', 'MMM YYYY', 'MMM YYYY')

            } else if (detalization == 'weeks') {
                query(it, rangeFrom, rangeTo, new DateTime(rangeFrom).withDayOfWeek(1), 'plusWeeks', 'WW YYYY', 'w y', 'dd-MMM')

            } else if (detalization == 'days') {
                query(it, rangeFrom, rangeTo, new DateTime(rangeFrom), 'plusDays', 'DDMMYYYY', 'ddMMyyyy', 'dd-MM-yyyy')

            } else {
                it.createSQLQuery("select c.date as dates, n.upid, c.duration, ifnull(a.name,'undefined') from Call c INNER JOIN Number n ON c.number_id=n.id LEFT OUTER JOIN AD_SOURCE a ON n.AD_SOURCE_ID=a.id where datediff(s, '1970-01-01', date) * 1000 between $rangeFrom and $rangeTo").list()
            }
        }
    }

    def query(def s, def rangeFrom, def rangeTo, def startFrom, def incrementer, def groupByPattern, def parsePattern, def keyPattern) {
        def q = s.createSQLQuery("select to_char(date, '$groupByPattern'), count(*) from Call " +
                "where datediff(s, '1970-01-01', date) * 1000 between $rangeFrom and $rangeTo " +
                "GROUP BY to_char(date, '$groupByPattern')").list()

        def f = DateTimeFormat.forPattern("$parsePattern");
        def qMap = q.collectEntries { [(f.parseDateTime(it[0])): it[1]] }

        while (startFrom.isBefore(rangeTo)) {
            qMap.putIfAbsent(startFrom, 0);
            startFrom = startFrom."$incrementer"(1)
        }

        qMap = qMap.sort({ a, b -> a.key <=> b.key })

        [x: qMap.collect { it.key.toString("$keyPattern") }, y: qMap.collect { it.value }]
    }

}
