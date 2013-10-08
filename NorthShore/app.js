
//main starting point
$(function() {
    //register maps loading
    google.maps.event.addDomListener(window, 'load', loadGoogleMaps);
    
    //make all buttons a jquery ui button
    $("#btn-next").button();
    
    
    //register clicks on the list items options
    $("#map-options > li").each(function() {
        
        var $li = $(this);
        
        $li.click(function() {
            $("#map-options > li").removeClass("active");
            $li.addClass("active");
        });
    });
});

//the different state/direction we could be travelling 
var state = {
    north: 0,
    south: 1,
    random: 2
};

//what the current state we are traveling in is
var currentState = state.north;


//global google maps element
var map;

function loadGoogleMaps()
{
    var mapDiv = $("#gmaps");
    //create map with centre at auckland
    map = new google.maps.Map(mapDiv[0], {
        center: new google.maps.LatLng(-36.836767,174.766281),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    //display no labels on the map
    var styleArray = [
        {
            "elementType": "labels",
            "stylers": [
                { "visibility": "off" }
            ]
        }
    ];
    map.setOptions({styles: styleArray});
    
    //show div
    var mapsWidth = mapDiv.width();
    var mapsHeight = 450;
    
    if($(document).width() < mapsWidth * 2)
        mapsHeight = $(document).height() * 0.5;
    
    mapDiv.height("" + mapsHeight + "px");
}






