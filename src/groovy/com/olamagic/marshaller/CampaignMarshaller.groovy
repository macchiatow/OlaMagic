package com.olamagic.marshaller

import com.olamagic.AdSource
import com.olamagic.Campaign
import grails.converters.JSON

/**
 * Created by togrul on 8/6/15.
 */
class CampaignMarshaller {

    void register(){
        JSON.registerObjectMarshaller(Campaign) { Campaign a ->
            return [
                    id				: a.id,
                    name       		: a.name,
                    numbers         : a.numbers?.id?: []
            ]
        }
    }
}
