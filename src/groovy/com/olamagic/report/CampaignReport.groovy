package com.olamagic.report

import com.olamagic.Call

import static org.grails.datastore.gorm.GormStaticApi.executeQuery
/**
 * Created by togrul on 9/30/15.
 */
class CampaignReport {

    def generate(){
        Call.executeQuery 'select n.upid, a.name from Call c, AdSource a, Number n where c.number = n.id and n.adSource = a.id'
    }
}
