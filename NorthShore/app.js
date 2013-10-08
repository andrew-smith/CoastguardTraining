

//the different state/direction we could be travelling 
var states = {
    north: "north",
    south: "south",
    random: "random"
};

//what the current state we are traveling in is
var currentMovementState = states.north;

//if the user is currently guessing what the name of the feature is
var isGuessing = true;

//global google maps element
var map;

//current marker that is being displayed
var currentMarkerDisplayed;


//all the things that need to load
var loadingState = {
    googleMaps: false,
    jsonData: false
}


//array of all the features of north shore (along with the coordinates)
var northShoreFeatures;
//where we currently are in the array
var currentFeatureIndex = -1;


//main starting point
$(function() {
    //register maps loading
    google.maps.event.addDomListener(window, 'load', loadGoogleMaps);
    
    //load all the map data
    $.getJSON("data.json", loadJsonData)
        .fail(function() {
            alert("Data failed to load. Please reload page to try again");
        });
    
    
    //make all buttons a jquery ui button
    $("#btn-reveal").button();
    
    $("#btn-reveal").click(btnRevealClick);
    
    
    //register clicks on the list items options
    $("#map-options > li").each(function() {
        
        var $li = $(this);
        
        $li.click(function() {
            $("#map-options > li").removeClass("active");
            $li.addClass("active");
            currentMovementState = $li.data("state");
        });
    });
});


//called when google maps is ready
function loadGoogleMaps()
{
    var mapDiv = $("#gmaps");
    //create map with centre at auckland
    map = new google.maps.Map(mapDiv[0], {
        center: new google.maps.LatLng(-36.836767,174.766281),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.SATELLITE
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
    
    loadingState.googleMaps = true;
    finishLoading();
}


//loads all the coordinates and names
//will only be called once
function loadJsonData(data)
{
    northShoreFeatures = data;
    
    //start at north head
    for(var i=0; i<northShoreFeatures.length; i++)
        if(northShoreFeatures[i].name == "North Head")
            currentFeatureIndex = i;
    
    //we will now be at north head - so pan to the position and place a marker
    panToPosition(getCurrentFeature().coords);
    currentMarkerDisplayed = placeMarker(getCurrentFeature().coords);
    
    loadingState.jsonData = true;
    finishLoading();
}


function finishLoading()
{
    for(_dep in loadingState)
    {
        if(!loadingState[_dep])
            return;
    }
    
    //if it gets to here then everything has finished loading
}


//goes to a position on google maps
//{lat, long}
function panToPosition(options)
{
    var point = new google.maps.LatLng(options.lat, options.long);
    map.panTo(point);
}


//places a marker and returns a marker object
//{lat, long}
function placeMarker(options)
{
    var point = new google.maps.LatLng(options.lat, options.long);
    
    //set marker
    var marker = new google.maps.Marker({
        position: point,
        map: map
    });
    
    return marker;
}


//gets the current feature (duh)
function getCurrentFeature()
{
    return northShoreFeatures[currentFeatureIndex];
}


//moves either north, south, or randomly (based on the state)
function nextFeature()
{
    switch(currentMovementState)
    {
        case states.north:
            currentFeatureIndex--;
            if(currentFeatureIndex < 0)
                currentFeatureIndex = northShoreFeatures.length - 1;
            break;
            
        case states.south:
            currentFeatureIndex++;
            if(currentFeatureIndex >= northShoreFeatures.length)
                currentFeatureIndex = 0;
            break;
            
        case states.random:
            currentFeatureIndex = Math.floor(Math.random() * northShoreFeatures.length);
            break;
    
    }
    
    return currentFeatureIndex;
}



function btnRevealClick()
{
    var textToDisplay = "Name this place!";
    var btnText = "Reveal!";
    
    if(isGuessing)
    {
        textToDisplay = getCurrentFeature().name;
        btnText = "Next";
    }
    else
    {
        nextFeature();
        panToPosition(getCurrentFeature().coords);
        
        //remove old marker
        currentMarkerDisplayed.setMap(null);
        currentMarkerDisplayed = placeMarker(getCurrentFeature().coords);
    }
    
    $("#reveal-place").text(textToDisplay);
    $("#btn-reveal").html(btnText);

    isGuessing = !isGuessing;
}


