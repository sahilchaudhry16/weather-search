({
    buttonPress : function(component, event, helper) {
        //Generate URL for request to Google APIs
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + component.get('v.address') + '&key=AIzaSyDHgwYiOsSK5Ag2F_ID5kuAAj-bfwcEGqI';
        helper.makeAjaxRequest(component, url);
    },
    keyCheck: function(component, event, helper){
        if(event.which == 13) {
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + component.get('v.address') + '&key=AIzaSyDHgwYiOsSK5Ag2F_ID5kuAAj-bfwcEGqI';
            helper.makeAjaxRequest(component, url);
        }
    },
})