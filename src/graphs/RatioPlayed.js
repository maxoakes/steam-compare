import {Doughnut} from 'react-chartjs-2';

const RatioPlayed = ({games}) => {
    let totalTime = 0;
    for(let i=0; i<games.length; i++){
        totalTime += games[i].playtime_forever;
    }
    console.log(totalTime)


    return(
        <div>

        </div>
    )
}
export default RatioPlayed;