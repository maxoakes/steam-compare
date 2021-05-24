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
    Tooltip,
    registerables
  } from 'chart.js';

const GamesGraph = ({games}) => {
    console.log(games[0]);
    let gamesSort = games;
    //https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
    gamesSort.sort((a, b) => (b.playtime_forever) - (a.playtime_forever));

    let gameNames = [];
    let playTime = []
    for(let i = 0; i<gamesSort.length && i < 10; i++){
        if(gamesSort[i].playtime_forever > 100){
        gameNames.push(gamesSort[i].name)
        playTime.push(gamesSort[i].playtime_forever)
        }
    }
    console.log(gameNames)

    const options = {
        responsive: true,
        plugins: {
        title: {
            display: true,
            text: 'Top 10 Most Played Games',
            color: 'white',
            position: 'top'
        }
    },
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90,
                    color: 'white'
                }
            },
            y:{
                ticks: {
                    color: 'white'
                }
            }
        }
    };
    const data = {
        labels: gameNames,
        datasets: [{
          label: 'Playtime',
          data: playTime,
          backgroundColor: '#6c757d',
        }]
    };

    return(
        <div className="bg-light table-responsive yellow-neon-border profile-info bg-dark">
            {games &&
            <Bar data={data} options = {options}/>
            }
        </div>

    );

}

export default GamesGraph