import {Redirect} from 'react-router-dom';
import {useEffect, useState} from "react";

const Main = ({usernameSearch, searchClick}) => {

  console.log("SEARCH:", usernameSearch)

  const [playerinfo, setPlayer] = useState("");
  const [onlineTest, setOnline] = useState("");
  const [steamLevel, setLevel] = useState("");
  const [timeLogOff, setTime] = useState("");
  const [hasPrivate, setPrivate] = useState(null);

  // TODO this works as a proxy website for CORS to allow the api to get fetched.
  //Perhaps there is a more elegent way to do this
  const proxy = "https://still-tor-77449.herokuapp.com/"

  async function grabData (event)
  {
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
      let appName = document.getElementById("game").value;
      let vanityURL = document.getElementById("username").value;
      let steamid = 0;
      let appid = 0;

      //check if the user entered a username to search for
      if (vanityURL)
      {
        //get a steamid from a 'vanity' url. This is the one for your steam profile
        //Max's is "scouteriv" from https://steamcommunity.com/id/scouteriv/
        console.log("ISteamUser/ResolveVanityURL")
        let steamidResponse = await fetchJSON(proxy + 
          'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=' + 
          key + '&vanityurl=' + vanityURL + '&format=json', headers)
        console.log(steamidResponse.response)
        steamid = steamidResponse.response.steamid;
        console.log("Found user " + steamid + " from " + vanityURL)
      }

      let appFullName;
      if (appName)
      {
        //get the appid from the game name that the user enters
        //this requests takes a few seconds. Likely(?) no way to get around it if we are not making a backend
        console.log("ISteamApps/GetAppList")
        let appListResponse = await fetchJSON(proxy + 
          'http://api.steampowered.com/ISteamApps/GetAppList/v0002/', headers)
        //console.log(appListResponse.applist.apps)

        //go through each game and see if the name of the game matches what the user entered
        let appObject = appListResponse.applist.apps.find(app => app.name.toLowerCase() === appName.toLowerCase());
        
        //set the appid only if the game is found
        if (appObject)
        {
          console.log(appObject)
          appFullName = appObject.name;
          console.log("Found game " + appObject.appid + " from " + appName)
          appid = appObject.appid;
        }
        else
        {
          console.log("No game found with: " + appName)
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
        console.log("\tappid AND steamid searched")

        console.log("ISteamUserStats/GetPlayerAchievements")
        let playerAchievementsResponse = await fetchJSON(proxy +
          'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=' + 
          key + '&steamid=' + steamid + '&appid=' + appid + '&format=json', headers)
        console.log(playerAchievementsResponse);

        //global stats
        console.log("ISteamUserStats/GetGlobalAchievementPercentagesForApp")
        let globalAchievementPercentagesResponse = await fetchJSON(proxy +
          'https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?key=' + 
          key + '&gameid=' + appid + '&format=json', headers)
        console.log(globalAchievementPercentagesResponse);

        console.log("ISteamUserStats/GetNumberOfCurrentPlayers")
        let numCurrentPlayersResponse = await fetchJSON(proxy +
          'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=' + 
          key + '&appid=' + appid + '&format=json', headers)
        console.log(numCurrentPlayersResponse);
        
        console.log("ISteamUserStats/GetSchemaForGame")
        let gameSchemaResponse = await fetchJSON(proxy +
          'https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=' + 
          key + '&appid=' + appid + '&format=json', headers)
        console.log(gameSchemaResponse.game);
        
        //let gameStats = gameSchemaResponse.game.availableGameStats.stats;
        //the inputs to this one must come from the previous API call
        //not a lot of games implement this. not sure if we want to call it
        // console.log("ISteamUserStats/GetSchemaForGame")
        // let globalGameStatsResponse = await fetchJSON(proxy +
        //   'https://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v1/?key=' + 
        //   key + '&appid=' + appid + '&count=' + gameStats.length + '&name[0]=' + gameStats[0].name + '&format=json', headers)
        // console.log(globalGameStatsResponse);

        console.log("ISteamUserStats/GetUserStatsForGame")
        let userStatsForGameResponse = await fetchJSON(proxy +
          'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=' + 
          key + '&appid=' + appid + '&steamid=' + steamid + '&format=json', headers)
        //userStatsForGameResponse.playerstats yields stats and acheivements, but achievements was retrieved earlier
        //console.log(userStatsForGameResponse.playerstats.stats);

        console.log("ISteamUser/GetPlayerSummaries")
        let playerSummeryResponse = await fetchJSON(proxy + 
          'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' + 
          key + '&steamids=' + steamid + '&format=json', headers)
        //console.log(playerSummeryResponse.response.players[0])
        
        console.log("IPlayerService/GetSteamLevel")
        let steamLevelResponse = await fetchJSON(proxy + 
          'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=' + 
          key + '&steamid=' + steamid + '&format=json', headers)
        //console.log(steamLevelResponse.response)
        
        setPlayer(playerSummeryResponse.response.players[0]);
        setLevel(steamLevelResponse.response.player_level.toString());

        createAppTitleHTML(appFullName, numCurrentPlayersResponse.response.player_count,
          playerAchievementsResponse.playerstats.achievements, appid);

        try
        {
          if (gameSchemaResponse.game.availableGameStats.achievements)
          {
            createAchievementTableHTML(playerAchievementsResponse.playerstats.achievements,
            globalAchievementPercentagesResponse.achievementpercentages.achievements,
            gameSchemaResponse.game.availableGameStats.achievements);
          }
        }
        catch(error)
        {
          console.error("Something in gameSchemaResponse.game.availableGameStats is undefined")
        }
      }
      //if only the username is valid
      else if (steamid && !appid)
      {
        console.log("\tONLY steamid searched")

        console.log("IPlayerService/GetOwnedGames")
        let ownedGamesResponse = await fetchJSON(proxy + 
          'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' + 
          key + '&steamid=' + steamid + '&format=json&include_appinfo=1', headers)
        console.log(ownedGamesResponse.response)

        console.log("IPlayerService/GetRecentlyPlayedGames")
        let recentlyPlayedGamesResponse = await fetchJSON(proxy + 
          'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=' + 
          key + '&steamid=' + steamid + '&format=json', headers)
        console.log(recentlyPlayedGamesResponse.response)

        console.log("IPlayerService/GetSteamLevel")
        let steamLevelResponse = await fetchJSON(proxy + 
          'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=' + 
          key + '&steamid=' + steamid + '&format=json', headers)
        console.log(steamLevelResponse.response)
        setLevel(steamLevelResponse.response.player_level.toString());
        console.log(steamLevel);

        console.log("IPlayerService/GetCommunityBadgeProgress")
        let communityBadgeProgressResponse = await fetchJSON(proxy + 
          'https://api.steampowered.com/IPlayerService/GetCommunityBadgeProgress/v1/?key=' + 
          key + '&steamid=' + steamid + '&format=json', headers)
        console.log(communityBadgeProgressResponse.response)

        console.log("ISteamUser/GetFriendList")
        let friendsListResponse = await fetchJSON(proxy + 
          'https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=' + 
          key + '&steamid=' + steamid + ',&format=json', headers)
        console.log(friendsListResponse)

        console.log("ISteamUser/GetPlayerBans")
        let playerBansResponse = await fetchJSON(proxy + 
          'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=' + 
          key + '&steamids=' + steamid + '&format=json', headers)
        console.log(playerBansResponse.players[0])

        console.log("ISteamUser/GetPlayerSummaries")
        let playerSummeryResponse = await fetchJSON(proxy + 
          'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' + 
          key + '&steamids=' + steamid + '&format=json', headers)
        console.log(playerSummeryResponse.response.players[0])
        setPlayer(playerSummeryResponse.response.players[0]);
        //console.log(playerinfo.loccountrycode);
        //console.log(profPic);
      
        console.log(playerinfo.personastate)
  

        console.log("ISteamUser/GetUserGroupList")
        let groupListResponse = await fetchJSON(proxy + 
          'https://api.steampowered.com/ISteamUser/GetUserGroupList/v1/?key=' + 
          key + '&steamid=' + steamid + '&format=json', headers)
        console.log(groupListResponse.response)

        createRecentlyPlayedGamesHTML(recentlyPlayedGamesResponse.response.games)
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

  function createAppTitleHTML(title, playerCount, achievements, appid)
  {
    let height = "75px";
    //entire banner
    let titleRow = document.createElement("div");
    titleRow.className = "row game-banner";

    //div containing the title text and background(?)
    let titleBox = document.createElement("div");
    titleBox.className = "col-xs-12 col-md-8 game-banner-title m-0 p-0";

    //attempt to fetch and use a high-quality background image for the game title
    let bannerURL = "https://steamcdn-a.akamaihd.net/steam/apps/" + appid + "/page_bg_generated.jpg"
    fetch(proxy + bannerURL)
    .then(response => {
      if (response.ok)
      {
        console.log("Found good image for title background");
        return response;
      }
      else if(response.status === 404)
      {
        return Promise.reject('error 404')
      }
      else
      {
        return Promise.reject('some other error: ' + response.status)
      }
    })
    .catch(error => {
      console.log("Error getting high-quality game image, using default, low-res header img instead");
      bannerURL = "https://steamcdn-a.akamaihd.net/steam/apps/" + appid + "/header.jpg";
    })
    .finally(function() {
      titleBox.style.backgroundImage = "url(" + bannerURL + ")";
    });
    titleRow.appendChild(titleBox);

    //game title text
    let titleText = document.createElement("h2");
    titleText.innerText = title;
    titleText.className = "text-light text-left align-middle";
    titleText.style.lineHeight = height;
    titleBox.appendChild(titleText);
    
    //right side div containing game stats
    let gameStatBox = document.createElement("div");
    gameStatBox.className = "col-xs-12 col-md-4 game-banner-info";
    titleRow.appendChild(gameStatBox);

    //current player count
    let playerCountText = document.createElement("p");
    playerCountText.innerText = playerCount + " players online";
    playerCountText.className = "text-light game-banner-info-playercount";
    gameStatBox.appendChild(playerCountText);


    let achievementCountText = document.createElement("p");

    if (achievements)
    {
      //achivements obtained so far
      let userAchievementCount = 0;
      for (let i = 0; i < achievements.length; i++)
      {
        if (achievements[i].achieved) userAchievementCount++;
      }
      achievementCountText.innerText = userAchievementCount + " out of " + achievements.length + " achievements obtained";
    }
    else
    {
      achievementCountText.innerText = title + " does not have achievements";
    }
    
    achievementCountText.className = "text-light text-center game-banner-info-achievement";
    gameStatBox.appendChild(achievementCountText);

    //put all this stuff into the HTML tree
    document.getElementById("user-app-content").appendChild(titleRow);
  }

  function createAchievementTableHTML(userAchievements, globalAchievements, achievementSchemas)
  {
    let achievementRow = document.createElement("div");
    achievementRow.className = "row col-xs-12";
    let achievementGrid = document.createElement("div");
    achievementGrid.className = "achievement-grid d-flex flex-row flex-wrap d-flex justify-content-between";

    console.log(userAchievements);
    console.log(globalAchievements);
    console.log(achievementSchemas);

    for (let i = 0; i < achievementSchemas.length; i++)
    {
      let iconSize = 75;
      let square = document.createElement("div");
      square.className = "achievement-square flex-fill col-xs-12 col-sm-6 col-md-4 col-lg-3";

      
      let icon = document.createElement("img");
      icon.className = "achievement-icon mx-auto";
      icon.width = iconSize;
      icon.height = iconSize;
      icon.src = achievementSchemas[i].icon;
      icon.alt = achievementSchemas[i].name;
      square.appendChild(icon);

      let globalRate = document.createElement("p");
      globalRate.className = "achievement-global-percent text-light";
      globalRate.innerText = globalAchievements[i].percent.toFixed(2) + "% of players have this achievement.";
      square.appendChild(globalRate);

      //get a time string
      let unlockTime = new Date(userAchievements[i].unlocktime*1000);
      let timeString = unlockTime.toDateString() + " at " + 
        unlockTime.getUTCHours().toString().padStart(2, '0') + ":" + 
        unlockTime.getUTCMinutes().toString().padStart(2, '0') + " UTC";

      let unlocked = document.createElement("p");
      unlocked.className = "achievement-unlock text-light";
      unlocked.innerText = userAchievements[i].achieved ?
        ("Unlocked " + convertSteamTimeToUTC(userAchievements[i].unlocktime)) : "Locked";
      square.appendChild(unlocked);

      let name = document.createElement("h3");
      name.className = "achievement-title text-light";
      name.innerText = achievementSchemas[i].displayName;
      square.appendChild(name);
      
      let description = document.createElement("p");
      description.className = "achievement-description text-light";
      description.innerText = achievementSchemas[i].description ? achievementSchemas[i].description : "";
      square.appendChild(description);
      
      achievementGrid.appendChild(square);
    }

    achievementRow.appendChild(achievementGrid);
    document.getElementById("user-app-content").appendChild(achievementRow);
  }

  function createRecentlyPlayedGamesHTML(games)
  {
    let gameListContainer = document.createElement("div");
    gameListContainer.className = "profile-info recentGames yellow-neon-border row mx-4 d-flex justify-content-center";

    let containerTitle = document.createElement("h4");
    containerTitle.className = "col-12 text-center mt-2";
    containerTitle.innerText = "Recently Played Games";
    gameListContainer.appendChild(containerTitle);

    document.getElementById("user-app-content").appendChild(gameListContainer);

    if (!games)
    {
      let message = document.createElement("h2");
      message.className = "text-center";
      message.innerText = "This profile has no games to display";
      gameListContainer.appendChild(message);
      return;
    }

    for (let i = 0; i < games.length; i++)
    {
      let singleGame = document.createElement("div");
      singleGame.key = games[i].appid;
      singleGame.className = "m-2 col-11 col-sm-3 bg-secondary p-2 rounded the-game";

      let gameIcon = document.createElement("img");
      gameIcon.id="game-icon";
      gameIcon.className="mr-3";
      gameIcon.src = "http://media.steampowered.com/steamcommunity/public/images/apps/" + games[i].appid + "/" + games[i].img_icon_url + ".jpg";
      gameIcon.alt = "Game icon: " + games[i].name;
      singleGame.appendChild(gameIcon);

      let gameTitle = document.createElement("span");
      gameTitle.className = "ml-2";
      gameTitle.innerText = games[i].name;
      singleGame.appendChild(gameTitle);

      let gamePlayTime = document.createElement("span");
      gamePlayTime.className = "game-facts m-2 p-2";
      gamePlayTime.innerText = "Playtime: " + games[i].playtime_forever + " min";
      singleGame.appendChild(gamePlayTime);
      gameListContainer.appendChild(singleGame);
    }
  }

  function convertSteamTimeToUTC(seconds)
  {
    if (!seconds)
    {
      return "Private";
    }
    //https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    let unlockTime = new Date(seconds*1000);
    let timeString = unlockTime.toDateString() + " at " + 
      unlockTime.getUTCHours().toString().padStart(2, '0') + ":" + 
      unlockTime.getUTCMinutes().toString().padStart(2, '0') + " UTC";
      
    return timeString;
  }

  async function fetchJSON(apiURL, headers)
  {
    let response = await fetch(apiURL, headers);
    if (response.status == 403)
    {
      console.error("User profile is likely set to private.");
      setPrivate(1);
    }
    else if (!response.ok)
    {
      console.error("There was an error: " + response.status);
    }
    let data = await response.json();
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

    setTime(convertSteamTimeToUTC(playerinfo.lastlogoff))
  }, [playerinfo])


  return(
    <div>
      <div className="row">
        <div className="col-xs-12 col-md-12">
          <div className="row"> 
            <div className="user-info col-xs-8 col-md-8 d-flex justify-content-center">
              <div className="profile-info yellow-neon-border mb-4 mt-2">
                <div className="d-flex justify-content-center mt-2">
                  <img id="profile-image" src={playerinfo.avatarfull} height="100px" width="100px" alt="Avatar"></img>
                </div>
                <p className="profile-text">
                  <span id="profile-display-name">{playerinfo.personaname} | </span>
                  {playerinfo.loccountrycode &&
                    <span id="profile-country">{playerinfo.loccountrycode} | </span>
                  }
                    <span id="profile-status">{onlineTest}</span> 
                    <br />
                    <span id="profile-level">Level {steamLevel}</span> | 
                    <span id="profile-steamid"> Steam ID: {playerinfo.steamid}</span> | 
                    {}
                    <span id="profile-steamid"> Last Time Online: {timeLogOff}</span> 
                </p>
              </div>
            </div>
          </div>
          <div id="user-app-content" className="row justify-content-center">
          </div>
        </div>
      </div>
    <div className="footer-space"></div>
      <Redirect to ="/" />
      {/* A little extra padding... */}
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
}

export default Main
