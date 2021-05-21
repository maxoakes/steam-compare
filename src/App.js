import './App.css'
import React, {useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router } from "react-router-dom";
import { Route, useHistory } from 'react-router'
import Main from './main.js'

function App()
{
  function BodyHTML()
  {
    const [usernameSearch, setUsernameSearch] = useState("");
    const [appSearch, setAppSearch] = useState("");
    const [isMainMenuSearch, setIsMainMenuSearch] = useState(true);
    const [searchClick, setClick] = useState(0);
  
    useEffect(() => {
      console.log("Searched name: " + usernameSearch + ". Searched app: "+ appSearch);
    });

    let searchMenuWithStatsHTML = (
      <div className="row">
        <div className="bg-dark body col-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <div className="col-sm-5">
                <label className="blue-glow" htmlFor="username">Steam ID</label>
                <input type="text"
                className="form-control dark-bg"
                id="username"
                aria-describedby="username-help"
                placeholder="Enter a Steam ID"
                name="username"
                value={usernameSearch}
                onChange={e => setUsernameSearch(e.target.value)}
                />
              </div>
              <div className="col-sm-5">
                <label className="green-glow" htmlFor="game">Steam Game</label>
                <input type="text"
                className="form-control"
                id="game"
                aria-describedby="game-help"
                placeholder="Enter a Steam Game"
                name="game"
                value={appSearch}
                onChange={e => setAppSearch(e.target.value)}
                />
              </div>
              <div className="col-sm-2 mt-4">
                  <button type="submit" id="entry-submit" className="btn btn-primary bg-dark" onClick={handleClick}>Search!</button>
              </div>
            </div>
          </form>
          <br></br>
          <Router>
            <Main usernameSearch={usernameSearch} searchClick={searchClick}></Main>
          </Router>      
        </div>
      </div>
    );

    let centeredSearchHTML = (
      <div className="row">
        <div className="body col-xs-12 col-md-12">
          <div className="form-body">
            <form id="entry-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Steam ID</label>
                <label className="blue-glow" htmlFor="username">Steam ID</label>
                      <input type="text"
                      className="form-control dark-bg"
                      id="username"
                      aria-describedby="username-help"
                      placeholder="Enter a Steam ID"
                      name="username"
                      value={usernameSearch}
                      onChange={e => setUsernameSearch(e.target.value)}
                      required/>
                <small id="username-help" className="form-text">Enter a Steam 'vanity' URL of a user.</small>
              </div>
              <div className="form-group">
                <label htmlFor="game">Steam Game</label>
                <input type="text"
                      className="form-control"
                      id="game"
                      aria-describedby="game-help"
                      placeholder="Enter a Steam Game"
                      name="game"
                      value={appSearch}
                      onChange={e => setAppSearch(e.target.value)}
                      />
                <small id="game-help" className="form-text">Enter a game or app that is available on Steam.</small>
              </div>
              <button type="submit" id="entry-submit" className="btn btn-primary" >Search!</button>
            </form>
          </div>
        </div>
      </div>
    );

    let bodyHTML = isMainMenuSearch ? centeredSearchHTML : searchMenuWithStatsHTML;

    function handleSubmit(event)
    {
      console.log("BUTTON PRESS: Searched name: " + usernameSearch + ". Searched app: "+ appSearch);
      event.preventDefault();
      if (appSearch || usernameSearch)
      {
        console.log("there is a search present");
        if (!isMainMenuSearch)
        {
          console.log("stats window already open, calling grabData() manually.");
          setIsMainMenuSearch(false);
          return bodyHTML;
        }
        setIsMainMenuSearch(false);
      }
      else
      {
        console.log("there is not a search present")
        setIsMainMenuSearch(true);
      };
    };

    function handleClick(event){
      setClick(searchClick+1);
    }
    
    return bodyHTML;
  };

  return (
    <div className='App'>
      <div className="container-fluid">
        <div className="row">
          <div className="header col-xs-12 col-md-12">
            <h1>Title</h1>
          </div>
        </div>
        <BodyHTML></BodyHTML>
        <div className="row">
          <div className="footer col-xs-12 col-md-12 bg-dark">
            <hr />
            <p className="footer-links">Link | Link | Link | Link | Link</p>
            <p className="footer-authors font-weight-light">Created by</p>
            <p className="footer-legal text-muted ">Steam and the Steam logo are trademarks of Valve Corporation. All other trademarks are property of their respective owners.
              <a href="\">Fair use disclaimer</a> 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;