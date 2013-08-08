
//list of all the islands

var Islands = [

    CreateIsland("Rangitoto", -36.788918, -185.141687),
    CreateIsland("Motutapu", -36.766643, -185.084524),
    CreateIsland("Rakino", -36.719198, -185.052123),
    CreateIsland("Otata", -36.695588, -185.025170),
    CreateIsland("Motuhoropapa", -36.690074, -185.035620),
    CreateIsland("Orarapa", -36.697919, -185.045552),
    CreateIsland("Maria", -36.709067, -184.994507),
    CreateIsland("Browns", -36.831443, -185.105980),
    CreateIsland("Motuihe", -36.812045, -185.051606),
    CreateIsland("Crusoe", -36.812635, -185.026865),
    CreateIsland("Waiheke", -36.800213, -184.891961),
    CreateIsland("Tarahiki", -36.791148, -184.773450),
    CreateIsland("Pakatoa", -36.796920, -184.805036),
    CreateIsland("Rotoroa", -36.815057, -184.801324),
    CreateIsland("Ponui", -36.866941, -184.815336),
    CreateIsland("Pakihi", -36.907594, -184.835484),
    
    CreateIsland("Tiritiri Matangi", -36.600949, -185.110507),
    
    
    CreateIsland("Watchman", -36.835060, -185.268090),    
    
    CreateIsland("Kotanui", -36.630903, -185.219284),
    
    CreateIsland("Kawau", -36.423976, -185.137737),
    CreateIsland("Beehive", -36.451891, -185.178821),
    CreateIsland("Motuketekete", -36.470354, -185.190518),
    CreateIsland("Moturekareka", -36.474150, -185.201225),
    CreateIsland("Motuora", -36.505411, -185.207003),
    
    CreateIsland("Little Barrier", -36.199738, -184.919856),
    CreateIsland("Great Barrier", -36.207806, -184.585588),
    CreateIsland("Channel", -36.421821, -184.668560),


];

var islandIndex = -1;

function NextIsland() {
    islandIndex++;
    
    if(islandIndex >= Islands.length)
        islandIndex = 0;
        
    return Islands[islandIndex];
}

function RandomIsland()
{
    return Islands[Math.floor(Math.random() * Islands.length)];
}


function CreateIsland(name, lat, long)
{
    return CreateLocation(name + " Island", lat, long);
}

function CreateLocation(name, lat, long)
{
    var location = {
        "name": name,
        "coords": [
            lat,long
        ]
    };
    
    location.coords.lat = location.coords[0];
    location.coords.long = location.coords[1];
    
    
    return location;
}

