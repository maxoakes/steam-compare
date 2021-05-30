
const Loading = ({loading, loadingMsg}) => {
    console.log(loading);

    return(
        <div className="loading-window">
            <span className="player-summary-tiny-font">LOADING</span>
            <h1 className="text-light">{loadingMsg}</h1>
            <h2 className="text-light">Loaded: {loading} items</h2>
        </div>
    );

}
export default Loading;