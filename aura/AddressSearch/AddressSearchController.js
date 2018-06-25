/**
 * Created by schaudhry on 6/24/18.
 */
({
    onPlaceSearch : function (component,event,helper) {
        component.set('v.loadData',true);
        var latitude = event.getParam("lat");
        var longitude = event.getParam("long");

        var action = component.get("c.callMetaWeather");
        action.setParams({
            latitudeVal : latitude,
            longitudeVal : longitude
        });
        action.setCallback(this, function(response) {

            if (response.getState() == 'SUCCESS') {
                var payload = JSON.parse(response.getReturnValue());
                var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                payload.consolidated_weather.forEach(function (weather) {
                    weather.dateObj = new Date(weather.applicable_date);
                    weather.formattedDate = days[weather.dateObj.getDay()];
                });
                payload.consolidated_weather = payload.consolidated_weather.slice(0,5);
                component.set("v.weatherObj",payload);
                var weather = component.get("v.weatherObj");

                var plotMapEvt = $A.get("e.c:PlotMapMarker");
                plotMapEvt.setParams({
                    'lat' : latitude,
                    'long' : longitude
                });
                plotMapEvt.fire();
            } else {
                console.log('Error!');
            }
            component.set('v.loadData',false);
        });
        $A.enqueueAction(action);
    }
})