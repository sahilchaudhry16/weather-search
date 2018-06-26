({
    makeAjaxRequest : function(component, url) {
        var utils = component.find('utils');

        //Make Ajax request by calling method from utils component
        utils.callAjax("POST", url, true,
            function(xmlhttp){
                if (xmlhttp.status == 200) {
                    var resultFromGoogle = JSON.parse(xmlhttp.responseText);
                    if(resultFromGoogle) {
                        var latitude = resultFromGoogle.results[0].geometry.location.lat;
                        var longitude = resultFromGoogle.results[0].geometry.location.lng;
                        var callMetaWeatherEvt = component.getEvent("searchPlace");
                        callMetaWeatherEvt.setParams({
                            lat : latitude,
                            long : longitude
                        });
                        callMetaWeatherEvt.fire();
                    }
                } else {
                        console.log('error !');
                }
            });
    },
})