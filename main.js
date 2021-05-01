document.getElementById("entry-form").addEventListener("submit", function(event)
{
    event.preventDefault();
    var homeURL = window.location.href+"getuserstats/?"
    var userAppID = "413150";
    var userPlayerID = "76561198009589509";
    var newURL = homeURL+userAppID+'='+userPlayerID;
    var req = new XMLHttpRequest();
    req.open("GET", newURL, true);
    req.addEventListener('load', function(){
        if(req.status>= 200 && req.status<400)
        {
            var response = JSON.parse(req.responseText);
            console.log(response);
        }
        else
        {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
    console.log("end of script");
});