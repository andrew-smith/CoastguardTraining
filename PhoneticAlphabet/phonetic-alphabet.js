

var PA = function(input) {

    if(input)
    {
        if(input.length == 1)
        {
            var index = input.toUpperCase().charCodeAt(0) - 65;
            if(index < 26 && index >= 0)
                return PA._alphabet[index];
        }
        else
        {
            var result = [];
            for(var i=0; i<input.length; i++)
            {
                result.push(PA(input.charAt(i)));
            }
            
            return result;
        }
    }
};


PA._alphabet = [
    "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot",
    "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima", 
    "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo",
    "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "Xray",
    "Yankee", "Zulu"
];



