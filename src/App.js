import './App.css'
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from './Main.js'

let gSearch = null;

function App() {



  return (
    <div className='App'>
      <div className="container-fluid">
        <div className="row">
          <div className="header col-xs-12 col-md-12">
            <h1>Title</h1>
            <HasSearched />
          </div>
        </div>
        <div className="row">
          <div className="body col-xs-12 col-md-12">
            <div className="form-body">
              <form id="entry-form">
                <div className="form-group">
                  <label htmlFor="username">Steam ID</label>
                  <input type="text" className="form-control" id="username" aria-describedby="username-help" placeholder="Enter a Steam ID" name="username" onChange={setSearch}/>
                  <small id="username-help" className="form-text">Enter a Steam 'vanity' URL of a user.</small>
                </div>
                <div className="form-group">
                  <label htmlFor="game">Steam Game</label>
                  <input type="text" className="form-control" id="game" aria-describedby="game-help" placeholder="Enter a Steam Game" name="game" value="Stardew Valley" />
                  <small id="game-help" className="form-text">Enter a game or app that is available on Steam.</small>
                </div>
                <Router>
                  <Link to="/main">
                    <button type="submit" id="entry-submit" className="btn btn-primary" >Search!</button>
                  </Link>

                  <Switch>
                    <Route path="/main">
                      <Main />
                    </Route>
                  </Switch>
                </Router>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="footer col-xs-12 col-md-12">
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

  function HasSearched(){
    let check = {gSearch};

  
    return check === "" ? (
      <h2>Theres a search {gSearch}</h2>
    ) : (
      <h2>No search yet</h2>
    );
  }

  function setSearch(event){
    gSearch = event.target.value;
    console.log(gSearch)
  }


export default App;