document.getElementById("entry-form").addEventListener("submit", function(event)
{
    var proxy = "https://still-tor-77449.herokuapp.com/"
    var key="386540A52F687754D4E1767230822EDE";
    var appid = document.getElementById("game").value;
    var userid = document.getElementById("username").value;
    var url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+key+'&steamid=' + userid + '&format=json';
    event.preventDefault();
    console.log();
    fetch(url, {headers: {'Access-Control-Allow-Origin':'*'}})
    .then(response => {
        console.log(response.json())
    })
    .catch(error => {
        console.log(error)
    });
});