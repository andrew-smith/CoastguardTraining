
//LocalKnowledge.js



var localKnowledgeIndexes = [];
var localKnowledgeData = [];


var currentItemsToDisplay = [];


var completelyLoadedCallback;

function initLocalKnowledge(callback)
{
    completelyLoadedCallback = callback;
    
    $.getJSON("data/data.json", function(data) {
        localKnowledgeIndexes = data;
        $.each(data, function(key, val) {
            totalResources = data.length;
            loadJsonResource(val);
        });
    });

}


function completeLoading() 
{
    if(typeof completelyLoadedCallback == "function")
        completelyLoadedCallback();
}

//how many resources to load
var totalResources = 0;
var totalResourcesLoaded = 0;
var allResourcesLoaded = false;

function loadJsonResource(res)
{
    //grab all the resources 
    $.getJSON("data/" + res.src, function(data) {
        localKnowledgeData[res.id] = data;
        totalResourcesLoaded++;
        if(totalResourcesLoaded == totalResources)
            loadJsonResourceComplete();
    });
}

function loadJsonResourceComplete() 
{
    allResourcesLoaded = true;
    
    populateOptions();
}


function populateOptions() 
{

    var $menu = $("#feature-selector");
    
    var buttonSetIds = [];
    
    $.each(localKnowledgeIndexes, function(key, data) {
    
        //find all the different features
        var features = [];
        
        $.each(localKnowledgeData[data.id], function(key, item) {
            if($.inArray(item.featureType, features) < 0)
                features.push(item.featureType);
        });
    
    
        $menu.append($("<h3>" + data.name + "</h3>"));
        
        
        
        var $content = $("<div></div>");
        $menu.append($content);
        
        //loop through features and display a toggle switch between them
        $.each(features, function(key, featureName) {
            var buttonSetId = data.id + "-" + featureName;
            
            var buttonSetName = buttonSetId + "-radio";
            buttonSetIds.push(buttonSetName);
            
            var $buttonCollection = $('<div id="' + buttonSetName + '"></div>');
            
            $buttonCollection.append('<input type="radio" name="' + buttonSetName + '" id="' + buttonSetId + '-en" /><label for="' + buttonSetId + '-en">Enabled</label>');
            $buttonCollection.append('<input type="radio" name="' + buttonSetName + '" checked="checked" id="' + buttonSetId + '-dis" /><label for="' + buttonSetId + '-dis">Disabled</label>');
            
            $content.append($("<p>" + featureName + "s</p>"));
            $content.append($buttonCollection);
            
            $("#" + buttonSetName).buttonset();
            
            //on enable - add all the features to the list of current items
            
            $("#" + buttonSetId + "-en, #" + buttonSetId + "-dis").change(function() {
            
                
                var allItems = localKnowledgeData[data.id];
                var featureLinkedTo = buttonSetId;
                
                //button enabled
                if($("#" + buttonSetId + "-en").is(':checked'))
                {
                    //get all items matching the selected feature
                    $.each(allItems, function(key, item) {
                    
                        //link the item to this feature
                        item.linkedTo = featureLinkedTo;
                    
                        if(item.featureType == featureName)
                            currentItemsToDisplay.push(item);
                    });
                }
                else
                {
                    currentItemsToDisplay = $.grep(currentItemsToDisplay, function(item, index) {
                        return (item.linkedTo == featureLinkedTo);
                    }, true);
                }
            
                /*
                
                */
            });
            
        });
        
        
        
        
        
        
        
        $menu.append($content);
        
        
    });
    
    
    $.each(buttonSetIds, function(key, buttonSetId) {
        $("#" + buttonSetId).buttonset();
    });
    
    $menu.accordion({
        heightStyle: "content",
        collapsible: true
    });
    
    
    
    completeLoading();
    
    
}



