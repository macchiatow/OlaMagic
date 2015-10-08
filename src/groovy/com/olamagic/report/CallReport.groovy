package com.olamagic.report

import com.olamagic.Call
import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat

class CallReport {

    def generate(Long rangeFrom, Long rangeTo, String detalization) {
        Call.withSession {
            if (detalization == 'none') {
                return it.createSQLQuery("select c.date as dates, n.upid, c.duration, ifnull(a.name,'undefined') from Call c INNER JOIN Number n ON c.number_id=n.id LEFT OUTER JOIN AD_SOURCE a ON n.AD_SOURCE_ID=a.id where datediff(s, '1970-01-01', date) * 1000 between $rangeFrom and $rangeTo").list()

            } else if (detalization == 'hours') {
                queryHours(it, rangeFrom, rangeTo)

            } else if (detalization == 'months') {
                queryMonths(it, rangeFrom, rangeTo)

            } else if (detalization == 'weeks') {
                queryWeeks(it, rangeFrom, rangeTo)

            } else if (detalization == 'days') {
                queryDays(it, rangeFrom, rangeTo)

            }
        }
    }

    def queryHours(def s, Long rangeFrom, Long rangeTo) {
        def q = s.createSQLQuery("select a * 3600 * 1000, b from (select datediff(s, '1970-01-01', date) / (60 * 60) a, count(*) b from Call where datediff(s, '1970-01-01', date) * 1000 between $rangeFrom and $rangeTo GROUP BY datediff(s, '1970-01-01', date) / (60 * 60))").list()

        def qMap = q.collectEntries { [(new DateTime((Long) it[0])): it[1]] }

        DateTime startHour = new DateTime(rangeFrom)
        while (startHour.isBefore(rangeTo)) {
            qMap.putIfAbsent(startHour, 0);
            startHour = startHour.plusHours(1)
        }

        qMap = qMap.sort({ a, b -> a.key <=> b.key })

        [x: qMap.collect { it.key.toString('HH:mm') }, y: qMap.collect { it.value }]
    }

    def queryMonths(def s, Long rangeFrom, Long rangeTo) {
        def q = s.createSQLQuery("select to_char(date, 'Mon YYYY') a, count(*) b from Call where datediff(s, '1970-01-01', date) * 1000 between $rangeFrom and $rangeTo GROUP BY to_char(date, 'Mon YYYY')").list()

        def f = DateTimeFormat.forPattern("MMM YYYY");
        def qMap = q.collectEntries { [(f.parseDateTime(it[0]).withYear(new DateTime().year)): it[1]] }

        DateTime startHour = new DateTime(rangeFrom).withDayOfMonth(1)
        while (startHour.isBefore(rangeTo)) {
            qMap.putIfAbsent(startHour, 0);
            startHour = startHour.plusMonths(1)
        }

        qMap = qMap.sort({ a, b -> a.key <=> b.key })

        [x: qMap.collect { it.key.toString('MMM YYYY') }, y: qMap.collect { it.value }]
    }

    def queryWeeks(def s, Long rangeFrom, Long rangeTo) {
        def q = s.createSQLQuery("select to_char(date, 'Mon') a, count(*) b from Call where datediff(s, '1970-01-01', date) * 1000 between $rangeFrom and $rangeTo GROUP BY to_char(date, 'Mon')").list()

        def f = DateTimeFormat.forPattern("MMM");
        def qMap = q.collectEntries { [(f.parseDateTime(it[0]).withYear(new DateTime().year)): it[1]] }

        DateTime startHour = new DateTime(rangeFrom).withDayOfMonth(1)
        while (startHour.isBefore(rangeTo)) {
            qMap.putIfAbsent(startHour, 0);
            startHour = startHour.plusMonths(1)
        }

        qMap = qMap.sort({ a, b -> a.key <=> b.key })

        [x: qMap.collect { it.key.toString('MMM') }, y: qMap.collect { it.value }]
    }

    def queryDays(def s, Long rangeFrom, Long rangeTo) {
        def q = s.createSQLQuery("select to_char(date, 'DDMMYYYY'), count(*) from Call where datediff(s, '1970-01-01', date) * 1000 between $rangeFrom and $rangeTo GROUP BY to_char(date, 'DDMMYYYY')").list()

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
