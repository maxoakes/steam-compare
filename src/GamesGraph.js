import {Bar} from 'react-chartjs-2';
import{
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MostPlayed from './graphs/MostPlayed.js'
import TimePlayed from './graphs/TimePlayed.js'
import RatioPlayed from './graphs/RatioPlayed'


const GamesGraph = ({games}) => {


    return(
        <div className="table-responsive profile-info col-md-12 col-sm-10 row d-flex justify-content-center">
            <div className="col-md-5 col-sm-10 m-2">
                        <MostPlayed games={games}/>
            </div>
            <div className="col-md-5 col-sm-10 m-2">
                        <TimePlayed games={games}/>
            </div>
            <div className="col-md-5 col-sm-10 m-2">
                <RatioPlayed games={games}/>
            </div>
            
            
        </div>

    );

}

export default GamesGraph