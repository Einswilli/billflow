""" This module is our homemade SDK responsible for Managing SMS services via infobip. """

from infobip_channels.sms.channel import SMSChannel


####
##      INFOBIP SMS MANAGER CLASS
#####
class MessageManager(object):
    ''' Infobip Manager class. '''
    
    def __init__(self):
    
        self.channel = SMSChannel.from_auth_params(
            {
                "api_key": "96f83ac9cf23ed1550a7af75a9202dac-e36db9aa-d1ab-4747-bcd1-57349f97b742",
                "base_url": "w1mkkd.api.infobip.com"
            }
        )
        
    def send_sms(self,msg,_to:str):
        ''' send a message to the a given phone number. '''
        
        sms_response = self.channel.send_sms_message(
            {
                "messages": [{
                    "destinations": [{
                        "to": _to
                    }],
                    "from": "DREAMMORE",
                    "text": msg
                }]
            }
        )
        
        return sms_response