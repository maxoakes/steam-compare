import MostPlayed from './graphs/MostPlayed.js'
import TimePlayed from './graphs/TimePlayed.js'
import RatioPlayed from './graphs/RatioPlayed'

const GamesGraph = ({games}) => {
    return(
        <div>
        {games && 
            <div className="table-responsive profile-info row d-flex justify-content-center">
                <div className="col-md-5 col-sm-10 m-2">
                    <TimePlayed games={games}/>
                </div>
                <div className="col-md-5 col-sm-10 m-2">
                    <RatioPlayed games={games}/>
                </div>
            </div>
        }
        </div>
    );

}

export default GamesGraph