import { useEffect, useState } from "react";

const RandomGame = ({games}) => {
    const [rngGame, setGame] = useState(null);
    let unplayed = [];
    console.log(games)
    for(let i = 0; i < games.length; i++){
        unplayed.push(games[i]);
    }
    console.log(typeof(unplayed))
    for(let i = unplayed.length-1; i >= 0; --i){
        if(unplayed[i].playtime_forever > 10){
            unplayed.splice(i, 1);
        }
    }

    const [click, setClick] = useState(0);
    function handleClick(event){
        setClick(click+1)
    }
    useEffect(() => {
        let rng = Math.floor(Math.random() * (unplayed.length-1 - 0) + 0);
        console.log(rng , unplayed.length)
        setGame(unplayed[rng]);
    }, [click])

    if(unplayed.length === 0){
        return(
            <div></div>
        )
    }

    return(
        <div className="profile-info mt-4 row text-center d-flex justify-content-center">
            <h3 className="text-light col-sm-10 m-2">Revisit one of your unplayed games:</h3>
            {rngGame &&
                <div className="text-center">
                     <img src={'http://media.steampowered.com/steamcommunity/public/images/apps/' + rngGame.appid + '/' + rngGame.img_logo_url + '.jpg'} 
                        alt={'Game icon:' + rngGame.name}  height="150px"/>
                    <h5>{rngGame.name}</h5>
                </div>
            }
            <button className="btn btn-primary m-2 col-2" onClick={handleClick}>Random Game Search</button>
        </div>
    );
}
export default RandomGame;