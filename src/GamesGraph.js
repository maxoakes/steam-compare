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
    let gamesSort = games;
    //https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
    gamesSort.sort((a, b) => (b.playtime_forever) - (a.playtime_forever));

    let gameNames = [];
    let playTime = []
    for(let i = 0; i<gamesSort.length && i < 30; i++){
        if(gamesSort[i].playtime_forever > 100){
        gameNames.push(gamesSort[i].name)
        playTime.push(gamesSort[i].playtime_forever)
        }
    }
    console.log(gameNames)

    return(
        <div className="bg-light">
            {games &&
            <Bar
            data={{
                labels: gameNames,
                datasets: [{
                  label: 'Playtime',
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