import './App.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from './main.js'


function App() {
  const[search, setSearch] = useState("");
 
  function theSearch(event){
    let user = document.getElementById("username");
    setSearch(user.value);
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
      <div className="row">
        <div className="bg-dark body col-12">

      <h2>theres a search {search}</h2>
              <form onSubmit={theSearch}>
                <div className="form-group row">

                  <div className="col-sm-5">
                    <label className="blue-glow" htmlFor="username">Steam ID</label>
                    <input type="text" className="form-control dark-bg" id="username" aria-describedby="username-help" placeholder="Enter a Steam ID" name="username" value="scouteriv"/>
                  </div>
                  <div className="col-sm-5">
                    <label className="green-glow" htmlFor="game">Steam Game</label>
                    <input type="text" className="form-control" id="game" aria-describedby="game-help" placeholder="Enter a Steam Game" name="game" />
                  </div>
                  <div className="col-sm-2 mt-4">
                      <button type="submit" id="entry-submit" className="btn btn-primary bg-dark" >Search!</button>
                  </div>
                </div>
              </form>
              <br></br>
     <Router>
       <Main></Main>
     </Router>
                 
        </div>
        </div>
    ) : (
      //this should activate when there isnt a search
      //what im thinking with this is once the user makes a search the search bars go to the top.
      //and when there isnt a search they are at the center.
      //or once the user clicks search it goes to a new page but idk how to do that with react
      <div className="row">
      <div className="body col-xs-12 col-md-12">
        <h1>No Search</h1>
        <div className="form-body">
          <form id="entry-form" onSubmit={theSearch}>
            <div className="form-group">
              <label htmlFor="username">Steam ID</label>
              <input type="text" className="form-control" id="username" aria-describedby="username-help" placeholder="Enter a Steam ID" name="username" value="scouteriv"/>
              <small id="username-help" className="form-text">Enter a Steam 'vanity' URL of a user.</small>
            </div>
            <div className="form-group">
              <label htmlFor="game">Steam Game</label>
              <input type="text" className="form-control" id="game" aria-describedby="game-help" placeholder="Enter a Steam Game" name="game" />
              <small id="game-help" className="form-text">Enter a game or app that is available on Steam.</small>
            </div>
        
          
                <button type="submit" id="entry-submit" className="btn btn-primary" >Search!</button>
        

          </form>
        </div>
      </div>
    </div>
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