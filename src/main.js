import {Redirect} from 'react-router-dom';
import {useEffect, useState} from "react";
import GamesGraph from './GamesGraph.js'

const Main = ({usernameSearch, searchClick}) => {

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

  console.log("SEARCH:", usernameSearch)

  const [playerinfo, setPlayer] = useState("");
  const [onlineTest, setOnline] = useState("");
  const [steamLevel, setLevel] = useState("");
  const [allGames, setGames] = useState(null);

  const [timeLogOff, setLastLogin] = useState("");
  const [isPrivate, setPrivate] = useState(false);

  //user content
  const [steamid, setSteamid] = useState(0);
  const [playedGames, setPlayedGames] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  //game content
  const [appid, setAppid] = useState(0);
  const [gameBannerURL, setGameBannerURL] = useState("");
  const [gameTitle, setGameTitle] = useState("");
  const [playerCount, setPlayerCount] = useState(0);
  const [gameAchievements, setGameAchievements] = useState([]);
  const [playerGameStats, setPlayerGameStats] = useState([]);
  

  //React things
  useEffect( () => {
    grabData();
  }, [searchClick]);
  
  useEffect( () => {
    switch(playerinfo.personastate)
    {
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
    setLastLogin(convertSteamTimeToUTC(playerinfo.lastlogoff));
  }, [playerinfo])

  async function grabData(event)
  {
    setPlayedGames(null);
    setGameTitle(null);
    setGameAchievements(null);
    setPlayerGameStats(null);
    setGames(null);

    //get the form seach boxes
    let appName = document.getElementById("game").value;
    let vanityURL = document.getElementById("username").value;
    let generatedSteamid;
    let generatedAppid;
    let generatedAppTitle;

    //game/app name
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
      generatedSteamid = steamidResponse.response.steamid;
      console.log("Found user " + generatedSteamid + " from " + vanityURL)
    }
    
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
        generatedAppid = appObject.appid;
        generatedAppTitle = appObject.name;
        console.log("Found game " + appObject.appid + " from " + appName)
      }
      else
      {
        console.log("No game found with: " + appName)
      }
    }

    let friendsListResponse;
    let playerSummeryResponse;
    //stats for player summary
    if (generatedSteamid)
    {
      console.log("ISteamUser/GetPlayerSummaries")
      playerSummeryResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' + 
        key + '&steamids=' + generatedSteamid + '&format=json', headers)
      console.log(playerSummeryResponse.response.players[0])
      
      console.log("IPlayerService/GetSteamLevel")
      let steamLevelResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + '&format=json', headers)
      console.log(steamLevelResponse.response)
      
      console.log("ISteamUser/GetFriendList")
      friendsListResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + ',&format=json', headers)
      console.log(friendsListResponse)

      console.log("ISteamUser/GetUserGroupList")
      let groupListResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/GetUserGroupList/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + '&format=json', headers)
      console.log(groupListResponse.response)

      setPlayer(playerSummeryResponse.response.players[0]);
      setLevel(steamLevelResponse.response.player_level);
      setFriendsList(friendsListResponse.friendslist);
    }

    //if both a user and game is searched and valid
    if (generatedSteamid && generatedAppid)
    {
      console.log("\tappid AND steamid searched")

      console.log("ISteamUserStats/GetPlayerAchievements")
      let playerAchievementsResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + '&appid=' + generatedAppid + '&format=json', headers)
      console.log(playerAchievementsResponse);

      console.log("ISteamUserStats/GetGlobalAchievementPercentagesForApp")
      let globalAchievementPercentagesResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?key=' + 
        key + '&gameid=' + generatedAppid + '&format=json', headers)
      console.log(globalAchievementPercentagesResponse);

      console.log("ISteamUserStats/GetNumberOfCurrentPlayers")
      let numCurrentPlayersResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=' + 
        key + '&appid=' + generatedAppid + '&format=json', headers)
      console.log(numCurrentPlayersResponse);
      setPlayerCount(numCurrentPlayersResponse.response.player_count);
      
      console.log("ISteamUserStats/GetSchemaForGame")
      let gameSchemaResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=' + 
        key + '&appid=' + generatedAppid + '&format=json', headers)
      console.log(gameSchemaResponse.game);
      
      // the inputs to this one must come from the previous API call
      // not a lot of games implement this. not sure if we want to call it
      let gameStats;
      let userStatsForGameResponse;
      try {
        gameStats = gameSchemaResponse.game.availableGameStats.stats;

        console.log("ISteamUserStats/GetUserStatsForGame")
        userStatsForGameResponse = await fetchJSON(proxy +
          'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=' + 
          key + '&appid=' + generatedAppid + '&steamid=' + generatedSteamid + '&format=json', headers)
        // userStatsForGameResponse.playerstats yields stats and acheivements, but achievements was retrieved earlier
        console.log(userStatsForGameResponse.playerstats.stats);
      }
      catch(unused) {
        console.log("Game does not have stats");
      }
       
      try {
        if (gameSchemaResponse.game.availableGameStats.achievements)
        {
          let mergedAchievementList = mergeAchievementObjects(
            playerAchievementsResponse.playerstats.achievements,
            globalAchievementPercentagesResponse.achievementpercentages.achievements,
            gameSchemaResponse.game.availableGameStats.achievements);
          console.log(mergedAchievementList);
          setGameAchievements(mergedAchievementList);

          let fullStatObject = makeStatObjects(gameSchemaResponse.game.availableGameStats.stats,
            userStatsForGameResponse.playerstats.stats);
          setPlayerGameStats(fullStatObject);
        }
      }
      catch(error) {
        console.error("Something in gameSchemaResponse.game.availableGameStats is undefined");
      }
    }
    //if only the username is valid
    else if (generatedSteamid && !generatedAppid)
    {
      console.log("\tONLY steamid searched")

      console.log("IPlayerService/GetOwnedGames")
      let ownedGamesResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + '&format=json&include_appinfo=1', headers)
      console.log(ownedGamesResponse.response)
      setGames(ownedGamesResponse.response.games)

      console.log("IPlayerService/GetRecentlyPlayedGames")
      let recentlyPlayedGamesResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + '&format=json', headers)
      console.log(recentlyPlayedGamesResponse.response)

      console.log("IPlayerService/GetCommunityBadgeProgress")
      let communityBadgeProgressResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetCommunityBadgeProgress/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + '&format=json', headers)
      console.log(communityBadgeProgressResponse.response)

      console.log("ISteamUser/GetPlayerBans")
      let playerBansResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=' + 
        key + '&steamids=' + generatedSteamid + '&format=json', headers)
      console.log(playerBansResponse.players[0])

      setPlayedGames(recentlyPlayedGamesResponse.response.games);
    }
    else if (!generatedSteamid && generatedAppid)
    {
      console.log("\tONLY valid appid searched")
    }
    else
    {
      console.log("\tNO valid item searched");
    }

    setSteamid(generatedSteamid);
    setAppid(generatedAppid);
    setGameTitle(generatedAppTitle);
    fetchGameBannerURL(generatedAppid);
    
  }

  //take the arrays of the achievement schema, global stats
  //and user stats and combine them into one array a unified object
  function mergeAchievementObjects(userAchievements, globalAchievements, achievementSchemas)
  {
    let achievementObjectList = [];
    for (let i = 0; i < achievementSchemas.length; i++)
    {
      let achievementObject = {
        achieved: userAchievements[i].achieved,
        apiname: userAchievements[i].apiname,
        unlocktime: userAchievements[i].unlocktime,
        name: globalAchievements[i].name,
        percent: globalAchievements[i].percent,
        defaultvalue: achievementSchemas[i].defaultvalue,
        displayName: achievementSchemas[i].displayName,
        hidden: achievementSchemas[i].hidden,
        icon: achievementSchemas[i].icon,
        icongray: achievementSchemas[i].icongray,
        name: achievementSchemas[i].name,
        description: achievementSchemas[i].description,
      }
      achievementObjectList.push(achievementObject);
    }
    return achievementObjectList;
  }

  //combine the stat schema and the stats of the player
  function makeStatObjects(statSchema, playerStats)
  {
    for (let i = 0; i < statSchema.length; i++)
    {
      for (let j = 0; j < playerStats.length; j++)
      {
        if (statSchema[i].name === playerStats[j].name)
        {
          statSchema[i].value = playerStats[j].value;
        }
      }
      if (!('value' in statSchema[i])) statSchema[i].value = 0;
      if (!(statSchema[i].displayName)) statSchema[i].displayName = statSchema[i].name;
    }
    statSchema = statSchema.filter(stat => stat.value != 0);
    return statSchema;
  }
    
  //convert the time that is recieved from steam api into a date and time
  function convertSteamTimeToUTC(seconds)
  {
    if (!seconds)
      return "Private";

    let unlockTime = new Date(seconds*1000);
    let timeString = unlockTime.toDateString() + " at " + 
      unlockTime.getUTCHours().toString().padStart(2, '0') + ":" + 
      unlockTime.getUTCMinutes().toString().padStart(2, '0') + " UTC";
      
    return timeString;
  }

  //fetch from an API URL and return the resulting JSON
  async function fetchJSON(apiURL, headers)
  {
    let response = await fetch(apiURL, headers);
    if ((response.status >= 400) && (response.status < 500))
    {
      console.error("client error. returning undefined to be caught later on");
      return undefined;
    }
    else if (!response.ok)
    {
      console.error("There was an error: " + response.status);
    }
    let data = await response.json();
    return data;
  }

  //convert minutes to hours and minutes
  function minutesToHours(minutes)
  {
    return Math.floor(minutes/60) + " hr " + (minutes % 60) + " min";
  }

  //take in an appid and return a url of an image of that appid's game/app
  async function fetchGameBannerURL(id)
  {
    let bannerURL = "https://steamcdn-a.akamaihd.net/steam/apps/" + id + "/page_bg_generated.jpg";
    let response = await fetch(proxy + bannerURL)
    .then(response => {
      if (response.ok)
        return response;
      else
        return Promise.reject(response.status);
    })
    .catch(error => {
      console.log("Error getting high-quality game image, using default, low-res header img instead: " + error);
      bannerURL = "https://steamcdn-a.akamaihd.net/steam/apps/" + id + "/header.jpg";
      return bannerURL;
    })
    .finally(function() {
      return bannerURL;
    });
    setGameBannerURL(bannerURL);
  }

  //take in an array of achievements and return what percent are 'achieved'
  function getAchievementPercent(achievementList)
  {
    if (achievementList)
    {
      //achievements obtained so far
      let userAchievementCount = 0;
      for (let i = 0; i < achievementList.length; i++)
      {
        if (achievementList[i].achieved) userAchievementCount++;
      }
      return (userAchievementCount + " out of " + achievementList.length + " achievements obtained");
    }
    else
    {
      return ("This game does not have achievements");
    }
  }

  //get the time that an achievement was unlocked, or state if it is still locked
  function getAchievementStatus(achievement)
  {
    return achievement.achieved ?
      ("Unlocked " + convertSteamTimeToUTC(achievement.unlocktime)) : "Locked";
  }

  //get the status of an achievement
  function getAchievementDescription(achievement)
  {
      return achievement.description ? achievement.description : "";
  }

  return(
    <div>
      <div className="row">
        <div className="col-xs-12 col-md-12">
          <div className="row"> 
            <div className="user-info col-xs-8 col-md-8 d-flex justify-content-center">
              <div className="profile-info yellow-neon-border m-2">
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
          {/* USER-ONLY SEARCH CONTENT */}
          {playedGames &&
          <div className="container m-4">
            <div className="profile-info mx-auto flex-row flex-wrap d-flex">
              <h4 className="col-12 text-center mt-2">Recently Played Games</h4>
              {playedGames.map(game => (
              <div key={game.appid} className="rounded the-game flex-fill m-2 p-2 col-xs-12 col-sm-6 col-md-2">
                <img id="game-icon" className="mr-3" src={'http://media.steampowered.com/steamcommunity/public/images/apps/' + game.appid + '/' + game.img_icon_url + '.jpg'} 
                  alt={'Game icon:' + game.name} height="50px" width="50px" />
                <span className="ml-2">{game.name}</span>
                <span className="game-facts rounded border border-light m-2 p-2">Playtime: {minutesToHours(game.playtime_forever)}</span>
              </div>
              ))}
            </div>
          </div>
          }
          {/* USER-GAME SEARCH CONTENT */}
            {/* Game banner */}
          {gameTitle &&
            <div className="row game-banner">
              <div className="col-xs-12 col-md-8 game-banner-title m-0 p-0" style={{backgroundImage: `url(${gameBannerURL})`}}>
              <h2 className="text-light text-left align-middle" style={{lineHeight: "75px"}}>{gameTitle}</h2>
              </div>
              <div className="col-xs-12 col-md-4 game-banner-info">
                <p className="text-light game-banner-info-playercount">{playerCount + " players online"}</p>
                <p className="text-light game-banner-info-achievement">{getAchievementPercent(gameAchievements)}</p>
              </div>
            </div>
          }
            {/* Game achievement grid */}
          {gameAchievements &&
            <div className="row col-xs-12">
              <div className="achievement-grid flex-row flex-wrap d-flex justify-content-between">
              {gameAchievements.map(achievement => (
                <div key={achievement.name} className="achievement-square flex-fill col-xs-12 col-sm-6 col-md-4 col-lg-3">
                  <img className="achievement-icon mx-auto" src={achievement.icon} alt={achievement.name} width="75px" height="75px"/>
                  <p className="achievement-global-percent text-light">{achievement.percent.toFixed(2)}% of players have this achievement.</p>
                  <p className="achievement-unlock text-light">{getAchievementStatus(achievement)}</p>
                  <h3 className="achievement-title text-light">{achievement.displayName}</h3>
                  <p className="achievement-description text-light">{getAchievementDescription(achievement)}</p>
                </div>
              ))}
              </div>
            </div>
          }
            {/* Game stats table */}
          {playerGameStats &&
          <div className="container">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">Stat Name</th>
                  <th scope="col">{playerinfo.personaname}'s Stat</th>
                </tr>
              </thead>
              {playerGameStats.map(stat => (
              <tbody key={stat.name} className="table-striped">
                <tr>
                  <th scope="row">{stat.displayName}</th>
                  <td>{stat.value}</td>
                </tr>
              </tbody>
              ))}
            </table>
          </div>
          }
          </div>
        </div>
      </div>
      {allGames &&

        <div className="row d-flex justify-content-center m-4">
          <br></br>
          <GamesGraph games={allGames}></GamesGraph>
        </div>
      }

    <div className="footer-space"></div>
      <Redirect to ="/" />
      {/* A little extra padding... */}
    </div>
  );
}

export default Main
