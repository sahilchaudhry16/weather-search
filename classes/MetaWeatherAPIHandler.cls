/**
 * Created by schaudhry on 6/24/18.
 */

public without sharing class MetaWeatherAPIHandler {

    @AuraEnabled
    public static Object callMetaWeather(Decimal latitudeVal, Decimal longitudeVal) {
//        String latitudeValStr = String.valueOf(latitudeVal) ;
//        String longitudeValStr = String.valueOf(longitudeVal);
       // System.debug(latitudeVal);
     //   System.debug(longitudeVal);
        Integer woeId = getWoeID(latitudeVal,longitudeVal);
        //make the second callout to get WoeId details
        HttpRequest request = new HttpRequest();
        //req.setEndpoint('callout:Meta_Weather');
        request.setEndpoint('https://www.metaweather.com/api/location/'+woeId+'/');
        request.setMethod('GET');
        Http http = new Http();
       // System.debug(request);
        HTTPResponse response = http.send(request);
      //  System.debug(response);
     //   System.debug(JSON.serialize(response.getBody()));
        return response.getBody();
    }

    public static Integer getWoeID(Decimal latitude, Decimal longitude) {
        HttpRequest req = new HttpRequest();
        //req.setEndpoint('callout:Meta_Weather');
        String urlParam = latitude+','+longitude;
        System.debug('urlParam--> '+urlParam);
        req.setEndpoint('https://www.metaweather.com/api/location/search/?lattlong='+urlParam);
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res = http.send(req);
       // System.debug('res--> '+res);
       // System.debug(res.getBody());
        JSONParser parser = JSON.createParser(res.getBody());
        //System.debug(parser);
        String woeId;
        while (parser.nextToken() != null) {
            if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) &&
                    (parser.getText() == 'woeid')) {
                // Get the value.
                parser.nextToken();
                //System.debug(parser.getText());
                // Compute the grand total price for all invoices.
                woeId = parser.getText();
                break;
            }
        }
         //system.debug('woeId--> ' + woeId);
        return Integer.valueOf(woeId);
    }

}