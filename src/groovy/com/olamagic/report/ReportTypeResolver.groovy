package com.olamagic.report

/**
 * Created by togrul on 9/30/15.
 */
class ReportTypeResolver {

    static resolve = [
            "1": new CampaignReport(),
            "2": new CallByDateReport(),
            "3": new CampaignByDayReport()

    ]
}
