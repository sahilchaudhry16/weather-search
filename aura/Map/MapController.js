({
    jsLoaded: function(component) {
        component.set("v.jsLoaded", true);
    },
    updateMap : function(component,event,helper) {

        var lat = event.getParam("lat");
        var long = event.getParam("long");
        var location = {};
        location.lat = lat;
        location.long = long;
        component.set("v.location", location);
    }
})