(this.webpackJsonpsteamcompare=this.webpackJsonpsteamcompare||[]).push([[0],{196:function(e,a,t){"use strict";t.r(a);var s=t(1),r=t.n(s),n=t(75),c=t.n(n),l=t(3),o=(t(83),t(84),t(20)),i=(t(2),t(13)),m=t.n(i),d=t(5),p=t(25),h=t(4),j=t(16),u=t(0),b=function(e){var a=e.games;console.log(a);for(var t=[0,0,0,0,0,0,0],s=0;s<a.length;s++)0===a[s].playtime_forever&&(t[0]+=1),a[s].playtime_forever<720&&a[s].playtime_forever>0&&(t[1]=t[1]+1),a[s].playtime_forever>=720&&a[s].playtime_forever<1440&&(t[2]=t[2]+1),a[s].playtime_forever>=1440&&a[s].playtime_forever<2160&&(t[3]=t[3]+1),a[s].playtime_forever>=2160&&a[s].playtime_forever<2880&&(t[4]=t[4]+1),a[s].playtime_forever>=2880&&a[s].playtime_forever<3600&&(t[5]=t[5]+1),a[s].playtime_forever>=3600&&(t[6]=t[6]+1);console.log(t);var r={labels:["Not Played","0-12 hrs","12-24 hrs","24-36 hrs","36-48 hrs","48-60 hrs","60+ hrs"],datasets:[{label:"Playtime",data:t,backgroundColor:["rgba(54, 162, 235, 0.8)","rgba(255, 206, 86, 0.8)","rgba(255, 99, 132, 0.8)","rgba(75, 192, 192, 0.8)","rgba(153, 102, 255, 0.8)","rgba(255, 159, 64, 0.8)","rgba(150, 50, 199, 0.8)","rgba(83, 102, 255, 0.8)","rgba(40, 159, 64, 0.8)","rgba(210, 199, 199, 0.8)"]}]};return Object(u.jsx)("div",{children:Object(u.jsx)(j.b,{data:r,options:{responsive:!0,plugins:{title:{display:!0,color:"white",position:"top",text:"Game Count"},legend:{display:!0}}}})})},f=function(e){for(var a=e.games,t=0,s=0;s<a.length;s++)t+=a[s].playtime_forever;console.log(t);var r=t/a.length;r/=1.3;var n=a;n.sort((function(e,a){return a.playtime_forever-e.playtime_forever}));for(var c=[],l=[],o=0;o<n.length;o++)n[o].playtime_forever>=r&&c.length<25&&(c.push(n[o].name),l.push(n[o].playtime_forever));console.log(c.length);var i={labels:c,datasets:[{label:"Playtime",data:l,backgroundColor:["hsl(214, 100%, 50%)","hsl(250, 75%, 20%)","hsl(214, 20%, 20%)","hsl(230, 20%, 75%)","hsl(214, 60%, 5%)","hsl(190, 60%, 75%)","hsl(214, 30%, 50%)"]}]};return Object(u.jsx)("div",{children:Object(u.jsx)(j.b,{data:i,options:{responsive:!0,plugins:{title:{display:!0,text:"Most Played Games",color:"white",position:"top"},legend:{display:!1}}}})})},g=function(e){var a=e.games;return Object(u.jsx)("div",{children:a&&Object(u.jsxs)("div",{className:"table-responsive profile-info row d-flex justify-content-center",children:[Object(u.jsx)("div",{className:"col-md-5 col-sm-10 m-2",children:Object(u.jsx)(b,{games:a})}),Object(u.jsx)("div",{className:"col-md-5 col-sm-10 m-2",children:Object(u.jsx)(f,{games:a})})]})})},x=function(e){var a=e.loading,t=e.loadingMsg;return console.log(a),Object(u.jsxs)("div",{className:"loading-window",children:[Object(u.jsx)("span",{className:"player-summary-tiny-font",children:"LOADING"}),Object(u.jsx)("h1",{className:"text-light",children:t}),Object(u.jsxs)("h2",{className:"text-light",children:["Loaded: ",a,"%"]})]})},y=function(e){var a=e.games,t=Object(s.useState)(null),r=Object(l.a)(t,2),n=r[0],c=r[1],o=[];console.log(a);for(var i=0;i<a.length;i++)o.push(a[i]);console.log(typeof o);for(var m=o.length-1;m>=0;--m)o[m].playtime_forever>10&&o.splice(m,1);var d=Object(s.useState)(0),p=Object(l.a)(d,2),h=p[0],j=p[1];return Object(s.useEffect)((function(){var e=Math.floor(Math.random()*(o.length-1-0)+0);console.log(e,o.length),c(o[e])}),[h]),0===o.length?Object(u.jsx)("div",{}):Object(u.jsxs)("div",{className:"profile-info mt-4 row text-center d-flex justify-content-center",children:[Object(u.jsx)("h3",{className:"text-light col-sm-10 m-2",children:"Revisit one of your unplayed games:"}),n&&Object(u.jsxs)("div",{className:"text-center row d-flex justify-content-center",children:[Object(u.jsx)("img",{className:"col-md-5 col-10",src:"http://media.steampowered.com/steamcommunity/public/images/apps/"+n.appid+"/"+n.img_logo_url+".jpg",alt:"Game icon:"+n.name}),Object(u.jsx)("h5",{children:n.name})]}),Object(u.jsx)("button",{className:"btn btn-outline-light m-2 col-3 btn-sm ",onClick:function(e){j(h+1)},children:"New Game"})]})},v=function(e){e.usernameSearch;var a,t,r=e.searchClick,n="https://still-tor-77449.herokuapp.com/",c="386540A52F687754D4E1767230822EDE",i={mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer"},j=Object(s.useState)(null),b=Object(l.a)(j,2),f=b[0],v=b[1],O=Object(s.useState)(""),N=Object(l.a)(O,2),S=N[0],w=N[1],k=Object(s.useState)(null),G=Object(l.a)(k,2),I=G[0],P=G[1],U=Object(s.useState)(""),_=Object(l.a)(U,2),L=_[0],C=_[1],F=Object(s.useState)(null),A=Object(l.a)(F,2),D=A[0],E=A[1],R=Object(s.useState)(0),M=Object(l.a)(R,2),B=(M[0],M[1]),T=Object(s.useState)([]),q=Object(l.a)(T,2),V=q[0],J=q[1],W=Object(s.useState)([]),Y=Object(l.a)(W,2),$=Y[0],z=Y[1],H=Object(s.useState)(0),K=Object(l.a)(H,2),Q=K[0],X=K[1],Z=Object(s.useState)(""),ee=Object(l.a)(Z,2),ae=ee[0],te=ee[1],se=Object(s.useState)(""),re=Object(l.a)(se,2),ne=re[0],ce=re[1],le=Object(s.useState)(0),oe=Object(l.a)(le,2),ie=oe[0],me=oe[1],de=Object(s.useState)([]),pe=Object(l.a)(de,2),he=pe[0],je=pe[1],ue=Object(s.useState)([]),be=Object(l.a)(ue,2),fe=be[0],ge=be[1];function xe(){return(xe=Object(p.a)(m.a.mark((function e(a){var t,s,r,l,o,d,p,h,j,u,b,f,g,x,y,O,N,S,w,k,G,I;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(P(null),C(""),E(null),B(0),J(null),z(null),ce(null),je(null),ge(null),t=document.getElementById("game").value,!(s=document.getElementById("username").value)){e.next=20;break}return console.log("ISteamUser/ResolveVanityURL"),e.next=15,Ne(n+"https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key="+c+"&vanityurl="+s+"&format=json",i);case 15:d=e.sent,!(r=d.response.steamid)&&/^\d+$/.test(s)&&(r=s),console.log("Found user "+r+" from "+s),ve(1,"Finding user "+r);case 20:if(!t){e.next=29;break}return console.log("ISteamApps/GetAppList"),e.next=24,Ne(n+"http://api.steampowered.com/ISteamApps/GetAppList/v0002/",i);case 24:p=e.sent,ve(8,"Searching for "+t),!(h=p.applist.apps.find((function(e){return e.name.toLowerCase()===t.toLowerCase()})))&&/^\d+$/.test(t)&&(console.log("Checking if the entered game is a valid appid"),h=p.applist.apps.find((function(e){return e.appid.toString()===t}))),h?(l=h.appid,o=h.name,console.log("Found game "+h.appid+" from "+t)):console.log("No game found with query "+t);case 29:if(!r){e.next=58;break}return console.log("ISteamUser/GetPlayerSummaries"),e.next=33,Ne(n+"https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key="+c+"&steamids="+r+"&format=json",i);case 33:return u=e.sent,console.log(u.response.players[0]),ve(15,"fetching player summary"),console.log("IPlayerService/GetSteamLevel"),e.next=39,Ne(n+"https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key="+c+"&steamid="+r+"&format=json",i);case 39:return b=e.sent,console.log(b.response),ve(27,""),console.log("ISteamUser/GetFriendList"),e.next=45,Ne(n+"https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key="+c+"&steamid="+r+",&format=json",i);case 45:return j=e.sent,console.log(j),ve(32,""),console.log("IPlayerService/GetOwnedGames"),e.next=51,Ne(n+"https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key="+c+"&steamid="+r+"&format=json&include_appinfo=1",i);case 51:f=e.sent,console.log(f.response),ve(41,""),E(f.response.games),P(u.response.players[0]),C(b.response.player_level),j&&z(j.friendslist.friends);case 58:if(!r||!l){e.next=101;break}return console.log("\tappid AND steamid searched"),ve(42,"Searching player achievements"),console.log("ISteamUserStats/GetPlayerAchievements"),e.next=64,Ne(n+"https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key="+c+"&steamid="+r+"&appid="+l+"&format=json",i);case 64:return g=e.sent,console.log(g),ve(57,""),console.log("ISteamUserStats/GetGlobalAchievementPercentagesForApp"),e.next=70,Ne(n+"https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?key="+c+"&gameid="+l+"&format=json",i);case 70:return x=e.sent,console.log(x),ve(69,""),console.log("ISteamUserStats/GetNumberOfCurrentPlayers"),e.next=76,Ne(n+"https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key="+c+"&appid="+l+"&format=json",i);case 76:return y=e.sent,console.log(y),me(y.response.player_count),ve(77,""),console.log("ISteamUserStats/GetSchemaForGame"),e.next=83,Ne(n+"https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key="+c+"&appid="+l+"&format=json",i);case 83:return O=e.sent,console.log(O.game),ve(100,""),e.prev=86,O.game.availableGameStats.stats,console.log("ISteamUserStats/GetUserStatsForGame"),e.next=91,Ne(n+"https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key="+c+"&appid="+l+"&steamid="+r+"&format=json",i);case 91:N=e.sent,console.log(N.playerstats.stats),e.next=98;break;case 95:e.prev=95,e.t0=e.catch(86),console.log("Game does not have stats");case 98:try{O.game.availableGameStats.achievements&&(S=ye(g.playerstats.achievements,x.achievementpercentages.achievements,O.game.availableGameStats.achievements),console.log(S),je(S),w=Oe(O.game.availableGameStats.stats,N.playerstats.stats),ge(w))}catch(a){console.log("Something in gameSchemaResponse.game.availableGameStats is undefined")}e.next=124;break;case 101:if(!r||l){e.next=123;break}return console.log("\tONLY steamid searched"),console.log("IPlayerService/GetRecentlyPlayedGames"),e.next=106,Ne(n+"https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key="+c+"&steamid="+r+"&format=json",i);case 106:return k=e.sent,console.log(k.response),J(k.response.games),ve(72,"Finding user stats"),console.log("IPlayerService/GetCommunityBadgeProgress"),e.next=113,Ne(n+"https://api.steampowered.com/IPlayerService/GetCommunityBadgeProgress/v1/?key="+c+"&steamid="+r+"&format=json",i);case 113:return G=e.sent,console.log(G.response),ve(99,""),console.log("ISteamUser/GetPlayerBans"),e.next=119,Ne(n+"https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key="+c+"&steamids="+r+"&format=json",i);case 119:I=e.sent,console.log(I.players[0]),e.next=124;break;case 123:!r&&l?console.log("\tONLY valid appid searched"):console.log("\tNO valid item searched");case 124:B(r),X(l),ce(o),Ge(l),v(null);case 129:case"end":return e.stop()}}),e,null,[[86,95]])})))).apply(this,arguments)}function ye(e,a,t){for(var s=[],r=0;r<t.length;r++){var n,c=(n={achieved:e[r].achieved,apiname:e[r].apiname,unlocktime:e[r].unlocktime,name:a[r].name,percent:a[r].percent,defaultvalue:t[r].defaultvalue,displayName:t[r].displayName,hidden:t[r].hidden,icon:t[r].icon,icongray:t[r].icongray},Object(d.a)(n,"name",t[r].name),Object(d.a)(n,"description",t[r].description),n);s.push(c)}return s}function ve(e,a){v(e),a&&w(a)}function Oe(e,a){for(var t=0;t<e.length;t++){for(var s=0;s<a.length;s++)e[t].name===a[s].name&&(e[t].value=a[s].value);"value"in e[t]||(e[t].value=0),e[t].displayName||(e[t].displayName=e[t].name)}return e=e.filter((function(e){return 0!=e.value}))}function Ne(e,a){return Se.apply(this,arguments)}function Se(){return(Se=Object(p.a)(m.a.mark((function e(a,t){var s,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(a,t);case 2:if(!((s=e.sent).status>=400&&s.status<500)){e.next=8;break}return console.error("client error. returning undefined to be caught later on"),e.abrupt("return",void 0);case 8:s.ok||console.error("There was an error: "+s.status);case 9:return e.next=11,s.json();case 11:return r=e.sent,e.abrupt("return",r);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function we(e){if(!e)return"Private";return new Date(1e3*e).toLocaleDateString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric"})}function ke(e){return e?we(e)+" ("+function(e){var a=new Date(1e3*e),t=Math.abs(Date.now()-a)/6e4,s=Math.floor(t%60),r=t/60,n=Math.floor(r%24),c=t/1440,l=Math.floor(c%365),o=t/525600,i=Math.floor(o);return(i?i+" years, ":"")+(l?l+" days, ":"")+(n?n+" hours, ":"")+(s?s+" minutes ":"")+"ago"}(e)+")":"Private"}function Ge(e){return Ie.apply(this,arguments)}function Ie(){return(Ie=Object(p.a)(m.a.mark((function e(a){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="https://steamcdn-a.akamaihd.net/steam/apps/"+a+"/page_bg_generated.jpg",e.next=3,fetch(n+t).then((function(e){return e.ok?e:Promise.reject(e.status)})).catch((function(e){return console.log("Error getting high-quality game image, using default, low-res header img instead: "+e),t="https://steamcdn-a.akamaihd.net/steam/apps/"+a+"/header.jpg"})).finally((function(){return t}));case 3:e.sent,te(t);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Pe(e){return e.achieved?"Unlocked "+we(e.unlocktime):"Locked"}function Ue(e){return e.description?e.description:""}return Object(s.useEffect)((function(){v(1),function(e){xe.apply(this,arguments)}(),v(null)}),[r]),f?Object(u.jsx)("div",{children:Object(u.jsx)(o.a,{children:Object(u.jsx)(x,{loading:f,loadingMsg:S})})}):Object(u.jsxs)("div",{children:[I&&Object(u.jsxs)("div",{className:"row d-flex justify-content-center",children:[Object(u.jsx)("div",{className:"container",children:Object(u.jsxs)("div",{className:"player-summary col-xs-12 col-md-12 col-lg-8 justify-content-between",children:[Object(u.jsx)("a",{className:"player-summary-avatar",href:I.profileurl,children:Object(u.jsx)("img",{id:"profile-image",src:I.avatarfull,alt:I.personaname+"'s avatar"})}),Object(u.jsxs)("div",{className:"player-summary-persona fs-2",children:[Object(u.jsx)("span",{className:"player-summary-tiny-font",children:"Full Persona Name"}),I.personaname]}),Object(u.jsxs)("div",{className:"player-summary-steamid fs-6",children:[Object(u.jsx)("span",{className:"player-summary-tiny-font",children:"SteamID"}),I.steamid]}),Object(u.jsxs)("div",{className:"player-summary-status fs-6",children:[Object(u.jsx)("span",{className:"player-summary-tiny-font",children:"Status"}),function(e){var a="Unknown";switch(e){case 0:a="Offline";break;case 1:a="Online";break;case 2:a="Busy";break;case 3:a="Away";break;case 4:a="Snooze";break;case 5:a="Looking to Trade";break;case 6:a="Looking to Play";break;default:a="Private"}return a}(I.personastate)]}),$&&Object(u.jsxs)("div",{className:"player-summary-friends fs-6",children:[Object(u.jsx)("span",{className:"player-summary-tiny-font",children:"Friends"}),$.length]}),I.realname&&Object(u.jsxs)("div",{className:"player-summary-real-name fs-6",children:[Object(u.jsx)("span",{className:"player-summary-tiny-font",children:"Real Name"}),I.realname]}),(I.locstatecode||I.loccountrycode)&&Object(u.jsxs)("div",{className:"player-summary-location fs-6",children:[Object(u.jsx)("span",{className:"player-summary-tiny-font",children:"Location"}),(a=I.locstatecode,t=I.loccountrycode,(a||"")+(a?", ":"")+(t||"")),Object(u.jsx)("img",{className:"player-summary-flag",src:"https://www.countryflags.io/"+I.loccountrycode+"/shiny/64.png"})]}),Object(u.jsxs)("div",{className:"player-summary-last-online fs-6",children:[Object(u.jsx)("span",{className:"player-summary-tiny-font",children:"Last Log off"}),ke(I.lastlogoff)]}),Object(u.jsxs)("div",{className:"player-summary-created fs-6",children:[Object(u.jsx)("span",{className:"player-summary-tiny-font",children:"Account Created"}),ke(I.timecreated)]}),Object(u.jsxs)("div",{className:"player-summary-level fs-6",children:[Object(u.jsx)("span",{className:"player-summary-tiny-font",children:"Steam Level"}),L]}),D&&Object(u.jsxs)("div",{className:"player-summary-games fs-6",children:[Object(u.jsx)("span",{className:"player-summary-tiny-font",children:"Owned Games"}),D.length]})]})}),Object(u.jsxs)("div",{id:"user-app-content",className:"row justify-content-center",children:[V&&Object(u.jsx)("div",{className:"container m-4",children:Object(u.jsxs)("div",{className:"profile-info mx-auto flex-row flex-wrap d-flex",children:[Object(u.jsx)("h4",{className:"col-12 text-center mt-2",children:"Recently Played Games"}),V.map((function(e){return Object(u.jsxs)("div",{className:"rounded the-game flex-fill m-2 p-2 col-xs-12 col-sm-6 col-md-3",children:[Object(u.jsx)("img",{id:"game-icon",className:"mr-3",src:"http://media.steampowered.com/steamcommunity/public/images/apps/"+e.appid+"/"+e.img_icon_url+".jpg",alt:"Game icon:"+e.name,height:"50px",width:"50px"}),Object(u.jsxs)("span",{className:"ml-2",children:[" ",e.name]}),Object(u.jsxs)("span",{className:"game-facts rounded border border-light m-2 p-2",children:["Playtime: ",(a=e.playtime_forever,Math.floor(a/60)+" hr "+a%60+" min")]})]},e.appid);var a}))]})}),ne&&Object(u.jsxs)("div",{className:"row game-banner",children:[Object(u.jsx)("div",{className:"col-xs-12 col-md-8 game-banner-title m-0 p-0",style:{backgroundImage:"url(".concat(ae,")")},children:Object(u.jsx)("h2",{className:"text-light text-left align-middle",style:{lineHeight:"75px"},children:ne})}),Object(u.jsxs)("div",{className:"col-xs-12 col-md-4 game-banner-info",children:[Object(u.jsx)("p",{className:"text-light game-banner-info-playercount",children:ie+" players online"}),Object(u.jsx)("p",{className:"text-light game-banner-info-achievement",children:function(e){if(e){for(var a=0,t=0;t<e.length;t++)e[t].achieved&&a++;return a+" out of "+e.length+" achievements obtained"}return"This game does not have achievements"}(he)})]})]}),he&&Object(u.jsx)("div",{className:"row col-xs-12",children:Object(u.jsx)("div",{className:"achievement-grid flex-row flex-wrap d-flex justify-content-between",children:he.map((function(e){return Object(u.jsxs)("div",{className:"achievement-square flex-fill col-xs-12 col-sm-6 col-md-4 col-lg-3",children:[Object(u.jsx)("img",{className:"achievement-icon mx-auto",src:e.icon,alt:e.name,width:"75px",height:"75px"}),Object(u.jsxs)("p",{className:"achievement-global-percent text-light",children:[e.percent.toFixed(2),"% of players have this achievement."]}),Object(u.jsx)("p",{className:"achievement-unlock text-light",children:Pe(e)}),Object(u.jsx)("h3",{className:"achievement-title text-light",children:e.displayName}),Object(u.jsx)("p",{className:"achievement-description text-light",children:Ue(e)})]},e.name)}))})}),fe&&Object(u.jsx)("div",{className:"container",children:Object(u.jsxs)("table",{className:"table table-dark table-hover",children:[Object(u.jsx)("thead",{children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{scope:"col",children:"Stat Name"}),Object(u.jsxs)("th",{scope:"col",children:[I.personaname,"'s Stat"]})]})}),fe.map((function(e){return Object(u.jsx)("tbody",{className:"table-striped",children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{scope:"row",children:e.displayName}),Object(u.jsx)("td",{children:e.value})]})},e.name)}))]})})]}),!Q&&D&&Object(u.jsxs)("div",{className:"row d-flex justify-content-center col-12",children:[Object(u.jsx)("br",{}),Object(u.jsx)(g,{games:D}),Object(u.jsx)(y,{games:D})]})]}),Object(u.jsx)("div",{className:"footer-space"}),Object(u.jsx)(h.a,{to:"/"})]})};var O=function(){function e(){var e=Object(s.useState)(""),a=Object(l.a)(e,2),t=a[0],r=a[1],n=Object(s.useState)(""),c=Object(l.a)(n,2),i=c[0],m=c[1],d=Object(s.useState)(!0),p=Object(l.a)(d,2),h=p[0],j=p[1],b=Object(s.useState)(0),f=Object(l.a)(b,2),g=f[0],x=f[1];Object(s.useEffect)((function(){console.log("Searched name: "+t+". Searched app: "+i)}));var y=Object(u.jsx)("div",{className:"row",children:Object(u.jsxs)("div",{className:"body col-12",children:[Object(u.jsx)("form",{onSubmit:N,children:Object(u.jsxs)("div",{className:"form-group row",children:[Object(u.jsxs)("div",{className:"col-sm-5",children:[Object(u.jsx)("label",{className:"search-bar",htmlFor:"username",children:"User Profile"}),Object(u.jsx)("input",{type:"text",className:"form-control dark-bg",id:"username","aria-describedby":"username-help",placeholder:"Enter a Steam ID or vanity URL",name:"username",value:t,onChange:function(e){return r(e.target.value)}})]}),Object(u.jsxs)("div",{className:"col-sm-5",children:[Object(u.jsx)("label",{className:"search-bar",htmlFor:"game",children:"Steam Game"}),Object(u.jsx)("input",{type:"text",className:"form-control",id:"game","aria-describedby":"game-help",placeholder:"Enter a Steam game name or ID",name:"game",value:i,onChange:function(e){return m(e.target.value)}})]}),Object(u.jsx)("div",{className:"col-xs-12 col-sm-2 mt-4",children:Object(u.jsx)("button",{type:"submit",id:"entry-submit",className:"btn btn-primary bg-dark",onClick:function(e){x(g+1)},children:"Search!"})})]})}),Object(u.jsx)("br",{}),Object(u.jsx)(o.a,{children:Object(u.jsx)(v,{usernameSearch:t,searchClick:g})})]})}),O=h?Object(u.jsx)("div",{className:"row",children:Object(u.jsx)("div",{className:"body col-xs-12 col-md-12",children:Object(u.jsx)("div",{className:"form-body",children:Object(u.jsxs)("form",{id:"entry-form",onSubmit:N,children:[Object(u.jsxs)("div",{className:"form-group",children:[Object(u.jsx)("label",{className:"search-bar h5",htmlFor:"username",children:"User Profile"}),Object(u.jsx)("input",{type:"text",className:"form-control dark-bg",id:"username","aria-describedby":"username-help",placeholder:"Enter a Steam ID or vanity URL",name:"username",value:t,onChange:function(e){return r(e.target.value)},required:!0}),Object(u.jsx)("small",{id:"username-help",className:"form-text",children:"Enter a Steam 'vanity' URL from a Steam profile, or enter the ID of a user."})]}),Object(u.jsxs)("div",{className:"form-group",children:[Object(u.jsx)("label",{htmlFor:"game",className:"search-bar h5",children:"Steam Game"}),Object(u.jsx)("input",{type:"text",className:"form-control",id:"game","aria-describedby":"game-help",placeholder:"Enter a Steam game or ID",name:"game",value:i,onChange:function(e){return m(e.target.value)}}),Object(u.jsx)("small",{id:"game-help",className:"form-text",children:"Enter an app name or ID that is available on Steam."})]}),Object(u.jsx)("button",{type:"submit",id:"entry-submit",className:"btn btn-primary bg-dark",children:"Search!"})]})})})}):y;function N(e){if(console.log("BUTTON PRESS: Searched name: "+t+". Searched app: "+i),e.preventDefault(),i||t){if(!h)return console.log("stats window already open, calling grabData() manually."),j(!1),O;j(!1)}else j(!0)}return O}return Object(u.jsx)("div",{className:"App",children:Object(u.jsxs)("div",{className:"container-fluid",children:[Object(u.jsx)("div",{className:"row",children:Object(u.jsx)("div",{className:"header col-xs-12 col-md-12",children:Object(u.jsx)("h1",{children:"SteamCompare"})})}),Object(u.jsx)(e,{}),Object(u.jsx)("div",{className:"row",children:Object(u.jsxs)("div",{className:"footer col-xs-12 col-md-12 bg-dark",children:[Object(u.jsx)("hr",{}),Object(u.jsxs)("p",{className:"footer-links",children:[Object(u.jsx)("a",{href:"https://steamdb.info/calculator/",children:"SteamDB"})," |\xa0",Object(u.jsx)("a",{href:"https://store.steampowered.com/",children:"Steam Store"})," |\xa0",Object(u.jsx)("a",{href:"https://partner.steamgames.com/doc/webapi_overview",children:"Steam Web API Documentation"})," |\xa0",Object(u.jsx)("a",{href:"https://steamapi.xpaw.me/",children:"xPaw's Steam Web API Documentation"})]}),Object(u.jsx)("p",{className:"footer-authors font-weight-light",children:"Created by Arturo Bravo, Courtney Ficker, Max Oakes"}),Object(u.jsx)("p",{className:"footer-legal text-muted ",children:"Steam and the Steam logo are trademarks of Valve Corporation. All other trademarks are property of their respective owners. This deployment was created under fair use."})]})})]})})};c.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(O,{})}),document.getElementById("root"))},83:function(e,a,t){}},[[196,1,2]]]);
//# sourceMappingURL=main.ac6e7901.chunk.js.map