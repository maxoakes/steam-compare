import {Bar} from 'react-chartjs-2';
import{
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MostPlayed from './graphs/MostPlayed.js'
import TimePlayed from './graphs/TimePlayed.js'


const GamesGraph = ({games}) => {


    return(
        <div className="bg-light table-responsive yellow-neon-border profile-info bg-dark col-md-8 col-sm-10 col-lg-5">
            {games &&
            <div>
            <Router>

                <Link to="/mostPlayed" className="m-4">Most Played</Link>
                <Link to="/timePlayed" className="m-4">Time Percentage</Link>
                
                <Switch>
                    <Route path='/mostPlayed'>
                        <MostPlayed games={games}/>
                    </Route>
                    <Route path='/timePlayed'>
                        <TimePlayed games={games}/>
                    </Route>
                </Switch>
            </Router>
            </div>
            }
            
        </div>

    );

}

export default GamesGraph