document.getElementById("entry-form").addEventListener("submit", function(event)
{
    var key="386540A52F687754D4E1767230822EDE";
    var appid = document.getElementById("game").value;
    var userid = document.getElementById("username").value;
    var url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+key+'&steamid=' + userid + '&format=json';
    event.preventDefault();
    fetch(url, {mode:'cors'}).then(response => {
        console.log(url)
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    });
    // var homeURL = window.location.href+"getuserstats/?"
    // var userAppID = "413150";
    // var userPlayerID = "76561198009589509";
    // var newURL = homeURL+userAppID+'='+userPlayerID;
    // var req = new XMLHttpRequest();
    // req.open("GET", newURL, true);
    // req.addEventListener('load', function(){
    //     if(req.status>= 200 && req.status<400)
    //     {
    //         var response = JSON.parse(req.responseText);
    //         console.log(response);
    //     }
    //     else
    //     {
    //         console.log("Error in network request: " + req.statusText);
    //     }
    // });
    // req.send(null);
    // console.log("end of script");
});