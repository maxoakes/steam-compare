
import {Bar} from 'react-chartjs-2';
const MostPlayed = ({games}) =>{

    console.log(games[0]);
    let gamesSort = games;
    //https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
    gamesSort.sort((a, b) => (b.playtime_forever) - (a.playtime_forever));

    let gameNames = [];
    let playTime = []
    let min2Hours = "";
    for(let i = 0; i<gamesSort.length && i < 10; i++){
        if(gamesSort[i].playtime_forever > 100){
        gameNames.push(gamesSort[i].name)
        min2Hours = Math.floor(gamesSort[i].playtime_forever/60) + " hr " + (gamesSort[i].playtime_forever % 60) + " min";
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
        },
        legend: {
            display: false
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
                    color: 'white',
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Minutes'
                    //This doesnt work
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
        <div>
            <Bar data={data} options = {options}/>
        </div>

    );
}
export default MostPlayed;