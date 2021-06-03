import {Redirect} from 'react-router-dom';
import {useEffect, useState} from "react";
import GamesGraph from './GamesGraph.js'
import Loading from './Loading.js'
import { BrowserRouter as Router } from "react-router-dom";
import RandomGame from './RandomGame.js';

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
  const [loading, setLoad] = useState(null);
  const [loadMsg, setLoadMsg] = useState("");

  const [playerSummary, setPlayerSummary] = useState(null);
  const [steamLevel, setLevel] = useState("");
  const [allGames, setGames] = useState(null);

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
    setLoad(null);
  }, [searchClick]);


  async function grabData(event)
  {
    //reset values
    setPlayerSummary(null);
    setLevel("");
    setGames(null);

    setSteamid(0);
    setPlayedGames(null);
    setFriendsList(null);
    
    setGameTitle(null);
    setGameAchievements(null);
    setPlayerGameStats(null);
    

    //get the form seach boxes
    let searchedApp = document.getElementById("game").value;
    let searchedProfile = document.getElementById("username").value;
    let generatedSteamid;
    let generatedAppid;
    let generatedAppTitle;
    //game/app name
    //check if the user entered a username to search for
    if (searchedProfile)
    {
      //get a steamid from a 'vanity' url. This is the one for your steam profile
      //Max's is "scouteriv" from https://steamcommunity.com/id/scouteriv/
      console.log("ISteamUser/ResolveVanityURL")
      let steamidResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=' + 
        key + '&vanityurl=' + searchedProfile + '&format=json', headers)
      console.log(steamidResponse.response)
      generatedSteamid = steamidResponse.response.steamid;
      
      //backup to check if the entered profile name is a steamid
      if (!generatedSteamid && /^\d+$/.test(searchedProfile))
      {
        console.log("checking if it is a steamid")
        generatedSteamid = searchedProfile;
      }
      console.log("Found user " + generatedSteamid + " from " + searchedProfile);

      setLoad(1)
      setLoadMsg("finding user " + generatedSteamid)
    }
    
    if (searchedApp)
    {
      //get the appid from the game name that the user enters
      //this requests takes a few seconds. Likely(?) no way to get around it if we are not making a backend
      console.log("ISteamApps/GetAppList")
      let appListResponse = await fetchJSON(proxy + 
        'http://api.steampowered.com/ISteamApps/GetAppList/v0002/', headers)

        setLoad(8)
        setLoadMsg("searching for " + searchedApp);
      console.log(appListResponse.applist.apps)

      //go through each game and see if the name of the game matches what the user entered
      let appObject = appListResponse.applist.apps.find(app => app.name.toLowerCase() === searchedApp.toLowerCase());
      if (!appObject && /^\d+$/.test(searchedApp))
      {
        console.log("checking if it is a appid")
        appObject = appListResponse.applist.apps.find(app => app.appid.toString() === searchedApp);
      }
      
      //set the appid only if the game is found
      if (appObject)
      {
        generatedAppid = appObject.appid;
        generatedAppTitle = appObject.name;
        console.log("Found game " + appObject.appid + " from " + searchedApp)
      }
      else
      {
        console.log("No game found with: " + searchedApp)
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

      setLoad(15)
      setLoadMsg("fetching player summary")

      console.log("IPlayerService/GetSteamLevel")
      let steamLevelResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + '&format=json', headers)
      console.log(steamLevelResponse.response)

      setLoad(27)
      
      console.log("ISteamUser/GetFriendList")
      friendsListResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + ',&format=json', headers)
      console.log(friendsListResponse)

      setLoad(32)

      console.log("IPlayerService/GetOwnedGames")
      let ownedGamesResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + '&format=json&include_appinfo=1', headers)
      console.log(ownedGamesResponse.response)
      setLoad(41)

      setGames(ownedGamesResponse.response.games)
      setPlayerSummary(playerSummeryResponse.response.players[0]);
      setLevel(steamLevelResponse.response.player_level);
      if (friendsListResponse) setFriendsList(friendsListResponse.friendslist.friends);
    }

    //if both a user and game is searched and valid
    if (generatedSteamid && generatedAppid)
    {
      console.log("\tappid AND steamid searched")

      setLoad(42)
      setLoadMsg("searching player achievements")
      console.log("ISteamUserStats/GetPlayerAchievements")
      let playerAchievementsResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + '&appid=' + generatedAppid + '&format=json', headers)
      console.log(playerAchievementsResponse);

      setLoad(57)

      console.log("ISteamUserStats/GetGlobalAchievementPercentagesForApp")
      let globalAchievementPercentagesResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?key=' + 
        key + '&gameid=' + generatedAppid + '&format=json', headers)
      console.log(globalAchievementPercentagesResponse);

      setLoad(69)

      console.log("ISteamUserStats/GetNumberOfCurrentPlayers")
      let numCurrentPlayersResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=' + 
        key + '&appid=' + generatedAppid + '&format=json', headers)
      console.log(numCurrentPlayersResponse);
      setPlayerCount(numCurrentPlayersResponse.response.player_count);

      setLoad(77)
      
      console.log("ISteamUserStats/GetSchemaForGame")
      let gameSchemaResponse = await fetchJSON(proxy +
        'https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=' + 
        key + '&appid=' + generatedAppid + '&format=json', headers)
      console.log(gameSchemaResponse.game);

      setLoad(100)
      
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

          // let combinedGameStats = combineStats(gameSchemaResponse.game.availableGameStats.stats,
          //   playerSummeryResponse.response.players[0],
          //   userStatsForGameResponse.playerstats.stats,
          //   friendsListResponse.friendslist.friends,
          //   generatedAppid);
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

      console.log("IPlayerService/GetRecentlyPlayedGames")
      let recentlyPlayedGamesResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + '&format=json', headers)
      console.log(recentlyPlayedGamesResponse.response)

      setLoad(72)
      setLoadMsg("finding user stats")

      console.log("IPlayerService/GetCommunityBadgeProgress")
      let communityBadgeProgressResponse = await fetchJSON(proxy + 
        'https://api.steampowered.com/IPlayerService/GetCommunityBadgeProgress/v1/?key=' + 
        key + '&steamid=' + generatedSteamid + '&format=json', headers)
      console.log(communityBadgeProgressResponse.response)

      setLoad(99)

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
    
    setLoad(null);
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

  async function combineStats(statSchema, player, playerStats, friends, gameid)
  {
    var t0 = performance.now()
    console.log(statSchema);
    console.log(player);
    console.log(playerStats);
    console.log(friends);

    let friendsListString = "";
    for (const friend of friends)
    {
      friendsListString = friendsListString.concat(friend.steamid + ",");
    }

    //get the names of steam friends
    let friendSummariesResponse = await fetchJSON(proxy + 
      'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' + 
      key + '&steamids=' + friendsListString + '&format=json', headers)
    let friendSummaries = friendSummariesResponse.response.players

    //fetch all of their games concurrently
    let friendsGameList = [];
    try {
      var list = await Promise.all(
        friendSummaries.map(friend => 
          fetch(proxy +
              'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' + 
              key + '&steamid=' + friend.steamid + '&format=json', headers)
            .then(response =>
              response = response.json())));
      friendsGameList = list;
    }
    catch (error)
    {
        console.log(error)
        throw (error)
    }

    //add the steamid to the game list so they have an accompanying person
    let friendsWithGame = []
    friendsWithGame.unshift(player);
    for (let i = 0; i < friendsGameList.length; i++)
    {
      if (!(friendsGameList[i].response['games'])) continue;
      for (let j = 0; j < friendsGameList[i].response.games.length; j++)
      {
        if (friendsGameList[i].response.games[j].appid === gameid)
        {
          friendsWithGame.push(friendSummaries[i]);
          break;
        }
      }
    }
    console.log(friendsWithGame)

    //fetch all stats concurrently
    let friendsStats = []
    try {
      var list = await Promise.all(
        friendsWithGame.map(friend => 
          fetch(proxy +
              'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=' + 
              key + '&appid=' + gameid + '&steamid=' + friend.steamid + '&format=json', headers)
            .then(response =>
              response = response.json())))
            .catch((error) => {
              console.error('Error:', error);
            })
        friendsStats = list;
    }
    catch (error)
    {
      console.log("Data is set to private for a friend")
    }

    console.log(friendsStats)
    var t1 = performance.now();
    console.log("Call to combineStats took " + ((t1 - t0)/1000).toFixed(1) + " seconds.");
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
    return Math.floor(minutes / 60) + " hr " + (minutes % 60) + " min";
  }

  //convert steam status if to a string
  function getStatusString(statusCode)
  {
    let status = "Unknown";
    switch(statusCode)
    {
      case 0:
        status = "Offline"
        break;
      case 1:
        status = "Online"
        break;
      case 2:
        status = "Busy"
        break;
      case 3:
        status = "Away"
        break;
      case 4:
        status = "Snooze"
        break;
      case 5:
        status = "Looking to Trade"
        break;
      case 6:
        status = "Looking to Play"
        break;
      default:
        status = "Private"
        break;
    }
    return status;
  }

  //convert the time that is recieved from steam api into a date and time
  function convertSteamTimeToUTC(seconds)
  {
    if (!seconds)
      return "Private";

    let time = new Date(seconds * 1000);
      
    let options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return time.toLocaleDateString('en-US', options);
  }

  function getTimeDifferenceString(timeInSeconds)
  {
    let then = new Date(timeInSeconds*1000)
    let differenceInMinutes = Math.abs(Date.now() - then) / (1000 * 60);
    let minutes = Math.floor(differenceInMinutes % 60);

    let differenceInHours = (differenceInMinutes / 60);
    let hours = Math.floor(differenceInHours % 24);

    let differenceInDays = (differenceInMinutes / (60 * 24));
    let days = Math.floor(differenceInDays % 365);
    let differenceInYears = (differenceInMinutes / (60 * 24 * 365));
    let years = Math.floor(differenceInYears);

    let timeDifference = (years ? (years + " years, ") : "")  + 
      (days ? (days + " days, ") : "") + 
      (hours ? (hours + " hours, ") : "") + 
      (minutes ? (minutes + " minutes ") : "") + "ago";
    return timeDifference;
  }

  //bundled function to return a string with time, and how long ago that time was
  function fullTimeWithDifference(timeInMilliseconds)
  {
    if (!timeInMilliseconds) return "Private";

    return convertSteamTimeToUTC(timeInMilliseconds) +
      " (" + getTimeDifferenceString(timeInMilliseconds) + ")";
  }

  function getLocationString(state, country)
  {
    return (state ? state : "") + (state ? ", " : "") + (country ? country : "")
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

  return (loading) ? (
    <div>
      <Router>
        <Loading loading={loading} loadingMsg={loadMsg} />
      </Router>
    </div>
  ) :
    (
    <div>
      {playerSummary &&
      <div className="row d-flex justify-content-center">
        {/* PLAYER SUMMARY THAT IS ALWAYS PRESENT */}
        <div className="container"> 
          <div className="player-summary col-xs-12 col-md-12 col-lg-8 justify-content-between">
              <a className="player-summary-avatar" href={playerSummary.profileurl}>
                <img id="profile-image" src={playerSummary.avatarfull} alt={playerSummary.personaname + "'s avatar"}></img>
              </a>
              <div className="player-summary-persona fs-2">
                <span className="player-summary-tiny-font">Full Persona Name</span>{playerSummary.personaname}
              </div>
              <div className="player-summary-steamid fs-6">
                <span className="player-summary-tiny-font">SteamID</span>{playerSummary.steamid}
              </div>
              <div className="player-summary-status fs-6">
                <span className="player-summary-tiny-font">Status</span>{getStatusString(playerSummary.personastate)}
              </div>
              {friendsList &&
              <div className="player-summary-friends fs-6">
                <span className="player-summary-tiny-font">Friends</span>{friendsList.length}
              </div>
              }
              {playerSummary.realname &&
              <div className="player-summary-real-name fs-6">
                <span className="player-summary-tiny-font">Real Name</span>{playerSummary.realname}
              </div>
              }
              {(playerSummary.locstatecode || playerSummary.loccountrycode) &&
              <div className="player-summary-location fs-6">
                <span className="player-summary-tiny-font">Location</span>{getLocationString(playerSummary.locstatecode,playerSummary.loccountrycode)}
                <img className="player-summary-flag" src={"https://www.countryflags.io/" + playerSummary.loccountrycode + "/shiny/64.png"}></img>
              </div>
              }
              <div className="player-summary-last-online fs-6">
                <span className="player-summary-tiny-font">Last Log off</span>{fullTimeWithDifference(playerSummary.lastlogoff)}
              </div>
              <div className="player-summary-created fs-6">
                <span className="player-summary-tiny-font">Account Created</span>{fullTimeWithDifference(playerSummary.timecreated)}
              </div>
              <div className="player-summary-level fs-6">
                <span className="player-summary-tiny-font">Steam Level</span>{steamLevel}
              </div>
              {allGames &&
              <div className="player-summary-games fs-6">
                <span className="player-summary-tiny-font">Owned Games</span>{allGames.length}
              </div>
              }
          </div>
        </div>
        <div id="user-app-content" className="row justify-content-center">
        {/* USER-ONLY SEARCH CONTENT */}
        {playedGames &&
        <div className="container m-4">
          <div className="profile-info mx-auto flex-row flex-wrap d-flex">
            <h4 className="col-12 text-center mt-2">Recently Played Games</h4>
            {playedGames.map(game => (
            <div key={game.appid} className="rounded the-game flex-fill m-2 p-2 col-xs-12 col-sm-6 col-md-3">
              <img id="game-icon" className="mr-3" src={'http://media.steampowered.com/steamcommunity/public/images/apps/' + game.appid + '/' + game.img_icon_url + '.jpg'} 
                alt={'Game icon:' + game.name} height="50px" width="50px" />
              <span className="ml-2"> {game.name}</span>
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
                <th scope="col">{playerSummary.personaname}'s Stat</th>
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
        {(!appid) && allGames &&

          <div className="row d-flex justify-content-center col-12">
            <br></br>
            <GamesGraph games={allGames}></GamesGraph>
            <RandomGame games={allGames}></RandomGame>
          </div>
        }
   </div>
      }
      
     
    <div className="footer-space"></div>
      <Redirect to ="/" />
      {/* A little extra padding... */}
    </div>
  );
}

export default Main
