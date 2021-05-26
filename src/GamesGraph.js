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
        <div className="bg-light table-responsive yellow-neon-border profile-info bg-dark">
            {games &&
            <div>
            <Router>
                <Link to="/mostPlayed">Most Played</Link>
                <Link to="/timePlayed">Time Percentage</Link>
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