
import {Redirect} from 'react-router-dom';
import {useEffect, useState} from "react";
const Main = ({usernameSearch, searchClick}) => {
  console.log("SEARCH:", usernameSearch)
  //THIS COULD HELP US ^^^^
  const [playerinfo, setPlayer] = useState("");
  const [onlineTest, setOnline] = useState("");
  const [steamLevel, setLevel] = useState("");
  const [timeLogOff, setTime] = useState("");
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

    let contentHead = document.getElementById("user-app-content")
    if (contentHead)
    {
      while (contentHead.firstChild)
      {
        contentHead.removeChild(contentHead.firstChild);
      }
    }

    //if both a user and game is searched and valid
    if (steamid && appid)
    {
      let appTitle;
      console.log("\tappid AND steamid searched")

      console.log("ISteamUserStats/GetPlayerAchievements")
      var playerAchievementsResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=' + 
        key + '&steamid=' + steamid + '&appid=' + appid + '&format=json', headers)
      //console.log(playerAchievementsResponse.playerstats);

      //global stats
      console.log("ISteamUserStats/GetGlobalAchievementPercentagesForApp")
      var globalAchievementPercentagesResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?key=' + 
        key + '&gameid=' + appid + '&format=json', headers)
      //console.log(globalAchievementPercentagesResponse.achievementpercentages);

      console.log("ISteamUserStats/GetNumberOfCurrentPlayers")
      var numCurrentPlayersResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=' + 
        key + '&appid=' + appid + '&format=json', headers)
      //console.log(numCurrentPlayersResponse.response);
      
      console.log("ISteamUserStats/GetSchemaForGame")
      var gameSchemaResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=' + 
        key + '&appid=' + appid + '&format=json', headers)
      console.log(gameSchemaResponse.game);
      appTitle = gameSchemaResponse.game.gameName;
      
      //var gameStats = gameSchemaResponse.game.availableGameStats.stats;
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

      console.log("ISteamUser/GetPlayerSummaries")
      var playerSummeryResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' + 
        key + '&steamids=' + steamid + '&format=json', headers)
      //console.log(playerSummeryResponse.response.players[0])
      
      console.log("IPlayerService/GetSteamLevel")
      var steamLevelResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=' + 
        key + '&steamid=' + steamid + '&format=json', headers)
      //console.log(steamLevelResponse.response)
      
      setPlayer(playerSummeryResponse.response.players[0]);
      setLevel(steamLevelResponse.response.player_level.toString());

      createAppTitleHTML(appTitle, numCurrentPlayersResponse.response.player_count);
      createAchievementTableHTML(playerAchievementsResponse.playerstats.achievements,
        globalAchievementPercentagesResponse.achievementpercentages.achievements,
        gameSchemaResponse.game.availableGameStats.achievements);
    }
    //if only the username is valid
    else if (steamid && !appid)
    {
      console.log("\tONLY steamid searched")

      console.log("IPlayerService/GetOwnedGames")
      var ownedGamesResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' + 
        key + '&steamid=' + steamid + '&format=json&include_appinfo=1', headers)
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
      setLevel(steamLevelResponse.response.player_level.toString());
      console.log(steamLevel);

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
      setPlayer(playerSummeryResponse.response.players[0]);
      //console.log(playerinfo.loccountrycode);
      //console.log(profPic);
     
      console.log(playerinfo.personastate)
 

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

function createAppTitleHTML(title, playerCount)
{
  let titleRow = document.createElement("div");
  titleRow.className = "row col-xs-12 col-md-12";

  let titleDiv = document.createElement("div");
  var titleText = document.createElement("h2");
  var playerCountText = document.createElement("p");

  titleDiv.className = "col-xs-12 col-md-12 p-2 app-title border border-warning";
  titleText.innerText = title;
  titleText.className = "text-light text-center";
  playerCountText.innerText = playerCount + " current active players";
  playerCountText.className = "text-light text-center";

  titleDiv.appendChild(titleText);
  titleDiv.appendChild(playerCountText);
  titleRow.appendChild(titleDiv);
  document.getElementById("user-app-content").appendChild(titleRow);
}

function createAchievementTableHTML(userAchievements, globalAchievements, achievementSchemas)
{
  let achievementRow = document.createElement("div");
  achievementRow.className = "row col-xs-12";
  let achievementGrid = document.createElement("div");
  achievementGrid.className = "d-flex flex-row flex-wrap";

  console.log(userAchievements);
  console.log(globalAchievements);
  console.log(achievementSchemas);

  for (let i = 0; i < achievementSchemas.length; i++)
  {
    let iconSize = 75;
    let square = document.createElement("div");
    square.className = "achievement-square border border-warning col-xs-12 col-sm-6 col-md-4 col-lg-3";

    
    let icon = document.createElement("img");
    icon.className = "achievement-icon mx-auto";
    icon.width = iconSize;
    icon.height = iconSize;
    icon.src = achievementSchemas[i].icon;
    icon.alt = achievementSchemas[i].name;
    square.appendChild(icon);

    let globalRate = document.createElement("p");
    globalRate.className = "achievement-global-percent text-light text-center m-0 p-0";
    globalRate.innerText = globalAchievements[i].percent.toFixed(2) + "% of players have this achievement.";
    square.appendChild(globalRate);

    let unlocked = document.createElement("p");
    unlocked.className = "achievement-unlock text-light text-center m-0 p-0";
    unlocked.innerText = userAchievements[i].achieved ? ("Unlocked " + userAchievements[i].unlocktime) : "Locked";
    square.appendChild(unlocked);

    let name = document.createElement("h3");
    name.className = "achievement-title text-light text-center fs-4";
    name.innerText = achievementSchemas[i].displayName;
    square.appendChild(name);
    
    let description = document.createElement("p");
    description.className = "achievement-description text-light text-center fs-6";
    description.innerText = achievementSchemas[i].description ? achievementSchemas[i].description : "No description provided";
    square.appendChild(description);
    
    achievementGrid.appendChild(square);
  }

  achievementRow.appendChild(achievementGrid);
  document.getElementById("user-app-content").appendChild(achievementRow);
}

async function fetchJSON(apiURL, headers)
{
  var response = await fetch(apiURL, headers);
  if (response.status === 403)
  {
    console.error("User profile is likely set to private.");
  }
  else if (!response.ok)
  {
    console.error("Oops! Something went wrong when getting API. Usually the case if a user input is not good. Error code " + response.status);
  }
  var data = await response.json();
  return data;
}

useEffect( () =>{
grabData();
}
, [searchClick]);

useEffect( () => {
  switch(playerinfo.personastate){
    case 0:
      setOnline("Offline")
      break;
    case 1:
      setOnline("Online")
      break;
    case 2:
      setOnline("Busy")
      break;
    case 3:
      setOnline("Away")
      break;
    case 4:
      setOnline("Snooze")
      break;
    case 5:
      setOnline("Looking to Trade")
      break;
    case 6:
      setOnline("Looking to Play")
      break;
    default:
      setOnline("Private")
      break;
  }
  console.log(onlineTest)

  //https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  let time = new Date(playerinfo.lastlogoff * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = time.getFullYear();
  var month = months[time.getMonth()];
  let date = time.getDate();
  let hours = time.getHours();
  let min = "0" + time.getMinutes();
  setTime(month + "/" + date + "/" + year+ "~" + hours + ':' + min.substr(-2))
  console.log(playerinfo.lastlogoff)
}, [playerinfo])

return(
  <div>
    {playerinfo &&
    <div className="row">
 
      <div className="col-xs-12 col-md-12">
        
        <div className="row "> 
          <div className="user-info col-xs-8 col-md-8 d-flex justify-content-center">
            <div className="profile-info yellow-neon-border">
              <div className="d-flex justify-content-center">
                <img id="profile-image" src={playerinfo.avatarfull} height="100px" width="100px" alt="Avatar"></img>
              </div>
              <p className="profile-text">
                <span id="profile-display-name">{playerinfo.personaname} | </span>
                  <span id="profile-country">{playerinfo.loccountrycode} | </span>
                  <span id="profile-status">{onlineTest}</span> 
                  <br />
                  <span id="profile-level">Level {steamLevel}</span> | 
                  <span id="profile-steamid">Steam ID {playerinfo.steamid}</span> | 
                  <span id="profile-steamid">Last Time Online {timeLogOff}</span> 
              </p>
            </div>
          </div>
        </div>
        <div id="user-app-content" className="row justify-content-center">
        </div>
      </div>
    </div>
    }
    <Redirect to ="/" />
  </div>
);


}
export default Main