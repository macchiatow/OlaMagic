package com.olamagic.report

import com.olamagic.Call
import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat

/**
 * Created by togrul on 9/30/15.
 */
class CampaignReport {

    def generate(Long rangeFrom, Long rangeTo, String detalization){
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

    def query(def session, def rangeFrom, def rangeTo, def startFrom, def incrementer, def groupByPattern, def parsePattern, def keyPattern) {
        def q = session.createSQLQuery("select ifnull(a.name,'undefined'), to_char(c.date, '$groupByPattern'), count(*) from Call c INNER JOIN Number n ON c.number_id=n.id LEFT OUTER JOIN AD_SOURCE a ON n.AD_SOURCE_ID=a.id where datediff(s, '1970-01-01', date) * 1000 between $rangeFrom and $rangeTo GROUP BY a.name, to_char(c.date, '$groupByPattern')").list()

        def campaignsAndCount = q.collectEntries {[(it[0]):[]]}
        def dates = []

        while (startFrom.isBefore(rangeTo)) {
            dates << startFrom;
            startFrom = startFrom."$incrementer"(1)
        }

        campaignsAndCount.each( { campaign,count ->
            dates.collect({it.toString(parsePattern)}).each({day ->
                def found =  q.find ({qi-> qi[0] == campaign && qi[1] == day})
                count << (found? found[2] : 0)
            })
        })

        [x:dates.collect({it.toString(keyPattern)}), y:campaignsAndCount.collect { [it.key, it.value] }]
    }

}
