package com.olamagic.report

import com.olamagic.Call
import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat

/**
 * Created by togrul on 9/30/15.
 */
class CampaignByDayReport {

    def generate(Long rangeFrom, Long rangeTo, String detalization){
        def f = DateTimeFormat.forPattern("ddMMyyyy");

        Call.withSession { session ->
            def q = session.createSQLQuery("select ifnull(a.name,'undefined'), to_char(c.date, 'DDMMYYYY'), count(*) from Call c INNER JOIN Number n ON c.number_id=n.id LEFT OUTER JOIN AD_SOURCE a ON n.AD_SOURCE_ID=a.id GROUP BY a.name, to_char(c.date, 'DDMMYYYY')")
                    .list().sort {a,b -> f.parseDateTime(a[1]) <=> f.parseDateTime(b[1])}

            def campaigns = q.collectEntries {[(it[0]):[]]}
            def dates = q.collect({it[1]}).unique()

            campaigns.each( { campaign,v ->
                dates.each({day ->
                    def found =  q.find ({qi-> qi[0] == campaign && qi[1] == day})
                    v << (found? found[2] : 0)
                })
            })

            [x:q.collect({it[1]}).unique(), y:campaigns.collect { [it.key, it.value] }]
        }
    }
}
