import {Doughnut} from 'react-chartjs-2';

const RatioPlayed = ({games}) => {
    let totalTime = 0;
    for(let i=0; i<games.length; i++){
        totalTime += games[i].playtime_forever;
    }
    console.log(totalTime)
    let avgTime = totalTime/games.length;
    avgTime = avgTime/1.5; //determines what qualifies to be graphed
    let gamesSort = games;
    //https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
    gamesSort.sort((a, b) => (b.playtime_forever) - (a.playtime_forever));
    let gameNames = [];
    let playTime = [];
    for(let i=0; i<gamesSort.length; i++){
        if(gamesSort[i].playtime_forever >= avgTime){
            gameNames.push(gamesSort[i].name);
            playTime.push(gamesSort[i].playtime_forever);
        }
    }
    const options = {
        responsive: true,
        plugins: {
        title: {
            display: true,
            text: 'Favorite Games(?)',
            color: 'white',
            position: 'top'
        },
        legend: {
            display: false
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
            <Doughnut data={data} options={options} />
        </div>
    )
}
export default RatioPlayed;