import {Doughnut} from 'react-chartjs-2';

const RatioPlayed = ({games}) => {
    let totalTime = 0;
    for(let i=0; i<games.length; i++){
        totalTime += games[i].playtime_forever;
    }
    console.log(totalTime)
    let gamesSort = games;
    //https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
    gamesSort.sort((a, b) => (b.playtime_forever) - (a.playtime_forever));



    return(
        <div>

        </div>
    )
}
export default RatioPlayed;