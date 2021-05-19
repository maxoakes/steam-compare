
import {Redirect} from 'react-router-dom';
import {useState} from "react";
export default function Main() {
  const [profPic, setPic] = useState("")
  const [personaName, setName] = useState("")
  const [playerinfo, setPlayer] = useState("");
async function grabData (event)
{
    //event.preventDefault();
    // TODO this works as a proxy website for CORS to allow the api to get fetched.
    //Perhaps there is a more elegent way to do this
    const proxy = "https://still-tor-77449.herokuapp.com/"

    //Max's api steam key. Use it for this project
    const key = "386540A52F687754D4E1767230822EDE";
    const headers =
    {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };

    //get the form seach boxes
    var appName = document.getElementById("game").value;
    var vanityURL = document.getElementById("username").value;
    var steamid = 0;
    var appid = 0;

    //check if the user entered a username to search for
    if (vanityURL)
    {
      //get a steamid from a 'vanity' url. This is the one for your steam profile
      //Max's is https://steamcommunity.com/id/scouteriv/
      //there might be additional ways to get a steamid
      console.log("ISteamUser/ResolveVanityURL")
      var steamidResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=' + 
        key + '&vanityurl=' + vanityURL + '&format=json', headers)
      console.log(steamidResponse.response)
      steamid = steamidResponse.response.steamid;
      console.log("Found user " + steamid + " from " + vanityURL)
    }

    if (appName)
    {
      //get the appid from the game name that the user enters
      //this requests takes a few seconds. Likely(?) no way to get around it if we are not making a backend
      console.log("ISteamApps/GetAppList")
      var appListResponse = await fetchJSON(proxy + 
        'http://api.steampowered.com/ISteamApps/GetAppList/v0002/', headers)
      //console.log(appListResponse.applist.apps)

      //go through each game and see if the name of the game matches what the user entered
      var appObject = appListResponse.applist.apps.find(app => app.name.toLowerCase() === appName.toLowerCase());
      
      //set the appid only if the game is found
      if (appObject)
      {
        console.log(appObject)
        console.log("Found game " + appObject.appid + " from " + appName)
        appid = appObject.appid;
      }
    }

    //if both a user and game is searched and valid
    if (steamid && appid)
    {
      console.log("\tappid AND steamid searched")

      console.log("ISteamUserStats/GetPlayerAchievements")
      var playerAchievementsResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=' + 
        key + '&steamid=' + steamid + '&appid=' + appid + '&format=json', headers)
      console.log(playerAchievementsResponse.playerstats);

      //global stats
      console.log("ISteamUserStats/GetGlobalAchievementPercentagesForApp")
      var globalAchievementPercentagesResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?key=' + 
        key + '&gameid=' + appid + '&format=json', headers)
      console.log(globalAchievementPercentagesResponse.achievementpercentages);

      console.log("ISteamUserStats/GetNumberOfCurrentPlayers")
      var numCurrentPlayersResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=' + 
        key + '&appid=' + appid + '&format=json', headers)
      console.log(numCurrentPlayersResponse.response);

      console.log("ISteamUserStats/GetSchemaForGame")
      var gameSchemaResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=' + 
        key + '&appid=' + appid + '&format=json', headers)
      console.log(gameSchemaResponse.game);
      var gameStats = gameSchemaResponse.game.availableGameStats.stats;

      //the inputs to this one must come from the previous API call
      //not a lot of games implement this. not sure if we want to call it
      // console.log("ISteamUserStats/GetSchemaForGame")
      // var globalGameStatsResponse = await fetchJSON(proxy +
      //   'https://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v1/?key=' + 
      //   key + '&appid=' + appid + '&count=' + gameStats.length + '&name[0]=' + gameStats[0].name + '&format=json', headers)
      // console.log(globalGameStatsResponse);

      console.log("ISteamUserStats/GetUserStatsForGame")
      var userStatsForGameResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=' + 
        key + '&appid=' + appid + '&steamid=' + steamid + '&format=json', headers)
      //userStatsForGameResponse.playerstats yields stats and acheivements, but achievements was retrieved earlier
      console.log(userStatsForGameResponse.playerstats.stats);

    }
    //if only the username is valid
    else if (steamid && !appid)
    {
      console.log("\tONLY steamid searched")

      console.log("IPlayerService/GetOwnedGames")
      var ownedGamesResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' + 
        key + '&steamid=' + steamid + '&format=json', headers)
      console.log(ownedGamesResponse.response)

      console.log("IPlayerService/GetRecentlyPlayedGames")
      var recentlyPlayedGamesResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=' + 
        key + '&steamid=' + steamid + '&format=json', headers)
      console.log(recentlyPlayedGamesResponse.response)

      console.log("IPlayerService/GetSteamLevel")
      var steamLevelResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=' + 
        key + '&steamid=' + steamid + '&format=json', headers)
      console.log(steamLevelResponse.response)

      console.log("IPlayerService/GetCommunityBadgeProgress")
      var communityBadgeProgressResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetCommunityBadgeProgress/v1/?key=' + 
        key + '&steamid=' + steamid + '&format=json', headers)
      console.log(communityBadgeProgressResponse.response)

      console.log("ISteamUser/GetFriendList")
      var friendsListResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=' + 
        key + '&steamid=' + steamid + ',&format=json', headers)
      console.log(friendsListResponse)

      console.log("ISteamUser/GetPlayerBans")
      var playerBansResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=' + 
        key + '&steamids=' + steamid + '&format=json', headers)
      console.log(playerBansResponse.players[0])

      console.log("ISteamUser/GetPlayerSummaries")
      var playerSummeryResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' + 
        key + '&steamids=' + steamid + '&format=json', headers)
      console.log(playerSummeryResponse.response.players[0])
      setPic(playerSummeryResponse.response.players[0].avatarfull);
      setName(playerSummeryResponse.response.players[0].personaname);
      setPlayer(playerSummeryResponse.response.players[0]);
      console.log(playerinfo.loccountrycode);
      //console.log(profPic);

      console.log("ISteamUser/GetUserGroupList")
      var groupListResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/GetUserGroupList/v1/?key=' + 
        key + '&steamid=' + steamid + '&format=json', headers)
      console.log(groupListResponse.response)

      //global stats

    }
    //if only a game was searched
    else if (!steamid && appid)
    {
      console.log("\tONLY appid searched")
    }
    //if nothing was searched?
    else
    {
      console.log("\tNO item searched");
    }
}

async function fetchJSON(apiURL, headers)
{
  var response = await fetch(apiURL, headers);
  if (!response.ok)
  {
    throw new Error("Oops! Something went wrong when getting API. \
    Usually the case if a user input is not good. Error code " + response.status);
  }
  var data = await response.json();
  return data;
}

grabData();

return(
  <div>
    {profPic && playerinfo &&
    <div className="row">
      <div className="body col-xs-12 col-md-12">
            <div className="row"> 
              <div className="user-info col-xs-8 col-md-8">
                <div id="profile-image">
                  <img src={profPic} height="100px" width="100px" alt="Avatar"></img>
                </div>
                <div class="profile-info">
                  <p class="profile-text">
                    <span id="profile-display-name">{personaName}</span> | 
                    <span id="profile-country">{playerinfo.loccountrycode}</span> | 
                    <span id="profile-status">isOnline</span> | 
                    <span id="profile-level">Level 999</span> | 
                    <span id="profile-url">urlusername</span> | 
                    <span id="profile-steamid">1234567890123456</span> | 
                  </p>
                </div>
              </div>
            </div>
      </div>
    </div>
    }
  </div>
);


}