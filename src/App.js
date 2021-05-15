import './App.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from './Main.js'


function App() {
  const[search, setSearch] = useState("");
 
  function theSearch(event){
    setSearch(event.target.value);
    console.log({search});
  }
  
  useEffect(()=>{
    HasSearched();
  }, [search])

function HasSearched(){
  console.log({search});
  let check = search;
  console.log(check)

  return (check !== "") ? (
    <div>
    <h2>theres a search {search}</h2>
              <form id="entry-form">
                <div className="form-group">
                  <label htmlFor="username">Steam ID</label>
                  <input type="text" className="form-control" id="username" aria-describedby="username-help" placeholder="Enter a Steam ID" name="username"/>
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
  ) : (
    <h2>No search yet</h2> //this should activate when there isnt a search
    //what im thinking with this is once the user makes a search the search bars go to the top.
    //and when there isnt a search they are at the center.
    //or once the user clicks search it goes to a new page but idk how to do that with react
  );
}

  return (
    <div className='App'>
      <div className="container-fluid">
        <div className="row">
          <div className="header col-xs-12 col-md-12">
            <h1>Title</h1>
          </div>
        </div>
        <HasSearched />
        <div className="row">
          <div className="body col-xs-12 col-md-12">
            <div className="form-body">
              <form id="entry-form">
                <div className="form-group">
                  <label htmlFor="username">Steam ID</label>
                  <input type="text" className="form-control" id="username" aria-describedby="username-help" placeholder="Enter a Steam ID" name="username" onChange={theSearch}/>
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

  /*
  

  function setSearch(event){
    gSearch = event.target.value;
    console.log(gSearch)
  }
  */

export default App;