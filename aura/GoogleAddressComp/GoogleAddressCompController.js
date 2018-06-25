({
    buttonPress : function(component, event, helper) {
        //Generate URL for request to Google APIs
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + component.get('v.address') + '&key=AIzaSyDHgwYiOsSK5Ag2F_ID5kuAAj-bfwcEGqI';
        //var metaWeatherUrl = 'https://www.metaweather.com/api/location/search/?query=' + component.get('v.address');
        //var metaWeatherUrl = 'https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02';

        //Add API key if provided
        // if(!$A.util.isUndefined(component.get('v.apikey'))){
        //     url += '&key=' + component.get('v.apikey');
        //
        // }

        //Make Ajax request
        helper.makeAjaxRequest(component, url);
        //helper.makeAjaxRequest(component, metaWeatherUrl);

    }
})