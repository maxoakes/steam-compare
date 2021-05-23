import {Bar} from 'react-chartjs-2';
import {
    Chart,
    BarElement,
    PointElement,
    BarController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  } from 'chart.js';

const GamesGraph = ({games}) => {
    console.log(games[0]);
    let gameNames = [];
    let playTime = []
    for(let i = 0; i<games.length; i++){
        gameNames.push(games[i].name)
        playTime.push(games[i].playtime_forever)
    }
    console.log(gameNames)

    return(
        <div className="bg-light">
            {games &&
            <Bar
            data={{
                labels: gameNames,
                datasets: [{
                  data: playTime,
                  backgroundColor: 'rgb(0,0,0)',
                }]
              }
              }

            />
}
        </div>

    );

}

export default GamesGraph