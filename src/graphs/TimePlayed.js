import {Doughnut} from 'react-chartjs-2';
const TimePlayed = ({games}) =>{
    console.log(games)
    let backgroundColors = [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(150, 50, 199, 0.8)',
        'rgba(83, 102, 255, 0.8)',
        'rgba(40, 159, 64, 0.8)',
        'rgba(210, 199, 199, 0.8)',
      ];
    let timePlayed = [
        "Not Played",
        "0-12 hrs",
        "12-24 hrs",
        "24-36 hrs",
        "36-48 hrs",
        "48-60 hrs",
        "60+ hrs"
    ]

    let counts = [
        0,0,0,0,0,0,0
    ]
    for(let i=0; i < games.length; i++){
        if(games[i].playtime_forever === 0){
            counts[0] += 1;
        }
        if(games[i].playtime_forever < 720 && games[i].playtime_forever > 0){//12 hrs or less
            counts[1] = counts[1] + 1;
        }
        if(games[i].playtime_forever >= 720 && games[i].playtime_forever < 1440){//12-24
            counts[2] = counts[2] + 1;
        }
        if(games[i].playtime_forever >= 1440 && games[i].playtime_forever < 2160){//24-36
            counts[3] = counts[3] + 1;
        }
        if(games[i].playtime_forever >= 2160 && games[i].playtime_forever < 2880){//36-48
            counts[4] = counts[4] + 1;
        }
        if(games[i].playtime_forever >= 2880 && games[i].playtime_forever < 3600){//48-60
            counts[5] = counts[5] + 1;
        }
        if(games[i].playtime_forever >= 3600){//60+
            
            counts[6] = counts[6] + 1;
        }
    }
    console.log(counts);

    const options = {
        responsive: true,
        plugins: {
        title: {
            display: true,
            color: 'white',
            position: 'top',
            text: 'Game Count'
        },
        legend: {
            display: true
        }
    }
    };
    const data = {
        labels: timePlayed,
        datasets: [{
          label: 'Playtime',
          data: counts,
          backgroundColor: backgroundColors,
        }]
    };

    return(
        <div>
            <Doughnut data={data} options={options} />
        </div>
    );
}
export default TimePlayed;