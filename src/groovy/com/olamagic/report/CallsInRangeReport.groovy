package com.olamagic.report

import com.olamagic.Call

/**
 * Created by togrul on 9/30/15.
 */
class CallsInRangeReport {
    def generate() {
        Call.withSession {
            it.createSQLQuery("select c.date as dates, n.upid, c.duration, ifnull(a.name,'undefined') from Call c INNER JOIN Number n ON c.number_id=n.id LEFT OUTER JOIN AD_SOURCE a ON n.AD_SOURCE_ID=a.id").list()
        }
    }
}
