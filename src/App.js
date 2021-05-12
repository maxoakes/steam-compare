import './App.css'
import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <div className="container-fluid">
        <div className="row">
          <div className="header col-xs-12 col-md-12">
            <h1>Title</h1>
          </div>
        </div>
        <div className="row">
          <div className="body col-xs-12 col-md-12">
            <div className="form-body">
              <form id="entry-form">
                <div className="form-group">
                  <label htmlFor="username">Steam ID</label>
                  <input type="text" className="form-control" id="username" aria-describedby="username-help" placeholder="Enter a Steam ID" name="username" value="scouteriv" />
                  <small id="username-help" className="form-text">Enter a Steam 'vanity' URL of a user.</small>
                </div>
                <div className="form-group">
                  <label htmlFor="game">Steam Game</label>
                  <input type="text" className="form-control" id="game" aria-describedby="game-help" placeholder="Enter a Steam Game" name="game" value="Stardew Valley" />
                  <small id="game-help" className="form-text">Enter a game or app that is available on Steam.</small>
                </div>
                <button type="submit" id="entry-submit" className="btn btn-primary">Search!</button>
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

export default App;