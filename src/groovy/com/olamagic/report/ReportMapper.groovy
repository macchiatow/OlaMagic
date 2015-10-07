package com.olamagic.report

/**
 * Created by togrul on 9/30/15.
 */
class ReportMapper {

    static resolve = [
            "1": new CallsInRangeReport(),
            "call": new CallReport(),
            "3": new CampaignByDayReport(),
    ]
}
