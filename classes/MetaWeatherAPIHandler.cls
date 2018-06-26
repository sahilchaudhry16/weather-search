/**
 * Created by schaudhry on 6/24/18.
 */

public without sharing class MetaWeatherAPIHandler {

    @AuraEnabled
    public static Object callMetaWeather(Decimal latitudeVal, Decimal longitudeVal) {

        Integer woeId = getWoeID(latitudeVal,longitudeVal);
        //make the second callout to get WoeId details
        HttpRequest request = new HttpRequest();
        //req.setEndpoint('callout:Meta_Weather'); //Named Credentials
        request.setEndpoint('https://www.metaweather.com/api/location/'+woeId+'/');
        request.setMethod('GET');
        Http http = new Http();
        HTTPResponse response = http.send(request);
        return response.getBody();
    }

    public static Integer getWoeID(Decimal latitude, Decimal longitude) {
        HttpRequest req = new HttpRequest();
        //req.setEndpoint('callout:Meta_Weather'); //Named Credentials
        String urlParam = latitude+','+longitude;
        //System.debug('urlParam--> '+urlParam);
        req.setEndpoint('https://www.metaweather.com/api/location/search/?lattlong='+urlParam);
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res = http.send(req);

        JSONParser parser = JSON.createParser(res.getBody());
        String woeId;
        while (parser.nextToken() != null) {
            if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) &&
                    (parser.getText() == 'woeid')) {
                parser.nextToken();
                woeId = parser.getText();
                break;
            }
        }
        return Integer.valueOf(woeId);
    }
}