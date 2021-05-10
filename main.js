document.getElementById("entry-form").addEventListener("submit", function(event)
{
    event.preventDefault();
    // TODO this works as a proxy website for CORS to allow the api to get fetched. Perhaps there is a more elegent way to do this
    const proxy = "https://still-tor-77449.herokuapp.com/"
    const key="386540A52F687754D4E1767230822EDE";
    const headers=
    {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }

    var appid = document.getElementById("game").value;
    var userid = document.getElementById("username").value;
    
    //if both a user and game is searched
    if (userid && appid)
    {
      console.log("appid and userid searched")

      fetch(proxy + 
        'https://partner.steam-api.com/ISteamUser/CheckAppOwnership/v2/?key=' + 
        key + '&steamid=' + userid + '&appid=' + appid + '&format=json', headers)
        .then(response => response.json())
        .then(function(data) {
          console.log("ISteamUser/CheckAppOwnership")
          console.log(data)
        })
        .catch(error => console.error(error));
    }
    else if (userid && !appid)
    {
      console.log("only userid searched")
      fetch(proxy + 
        'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' + 
        key + '&steamid=' + userid + '&format=json', headers)
        .then(response => response.json())
        .then(function(data) {
          console.log("IPlayerService/GetOwnedGames")
          console.log(data)
        })
        .catch(error => console.error(error));

      fetch(proxy + 
        'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=' + 
        key + '&steamid=' + userid + '&format=json', headers)
        .then(response => response.json())
        .then(function(data) {
          console.log("IPlayerService/GetRecentlyPlayedGames")
          console.log(data)
        })
        .catch(error => console.error(error));

      fetch(proxy + 
        'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=' + 
        key + '&steamid=' + userid + '&format=json', headers)
        .then(response => response.json())
        .then(function(data) {
          console.log("IPlayerService/GetSteamLevel")
          console.log(data)
        })
        .catch(error => console.error(error));

      fetch(proxy + 
        'https://api.steampowered.com/IPlayerService/GetCommunityBadgeProgress/v1/?key=' + 
        key + '&steamid=' + userid + '&format=json', headers)
        .then(response => response.json())
        .then(function(data) {
          console.log("IPlayerService/GetCommunityBadgeProgress")
          console.log(data)
        })
        .catch(error => console.error(error));

      fetch(proxy + 
        'https://api.steampowered.com/IPlayerService/GetCommunityBadgeProgress/v1/?key=' + 
        key + '&steamid=' + userid + '&format=json', headers)
        .then(response => response.json())
        .then(function(data) {
          console.log("IPlayerService/GetCommunityBadgeProgress")
          console.log(data)
        })
        .catch(error => console.error(error));

      fetch(proxy + 
        'https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=' + 
        key + '&steamid=' + userid + '&format=json', headers)
        .then(response => response.json())
        .then(function(data) {
          console.log("ISteamUser/GetFriendList")
          console.log(data)
        })
        .catch(error => console.error(error));

      fetch(proxy + 
        'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=' + 
        key + '&steamid=' + userid + '&format=json', headers)
        .then(response => response.json())
        .then(function(data) {
          console.log("ISteamUser/GetPlayerBans")
          console.log(data)
        })
        .catch(error => console.error(error));

      fetch(proxy + 
        'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' + 
        key + '&steamid=' + userid + '&format=json', headers)
        .then(response => response.json())
        .then(function(data) {
          console.log("ISteamUser/GetPlayerSummaries")
          console.log(data)
        })
        .catch(error => console.error(error));

      fetch(proxy + 
        'https://api.steampowered.com/ISteamUser/GetUserGroupList/v1/?key=' + 
        key + '&steamid=' + userid + '&format=json', headers)
        .then(response => response.json())
        .then(function(data) {
          console.log("ISteamUser/GetUserGroupList")
          console.log(data)
        })
        .catch(error => console.error(error));

      fetch(proxy + 
        'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=' + 
        key + '&steamid=' + userid + '&format=json', headers)
        .then(response => response.json())
        .then(function(data) {
          console.log("ISteamUser/ResolveVanityURL")
          console.log(data)
        })
        .catch(error => console.error(error));
    }
    else if (!userid && appid)
    {
      console.log("only appid searched")
    }
    else
    {
      console.log("no item searched");
    }
});


