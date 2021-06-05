import ProgressBar from 'react-bootstrap/ProgressBar'
const Loading = ({loading, loadingMsg}) => {
    return(
        <div className="loading-window">
            <span className="player-summary-tiny-font">LOADING</span>
            <h1 className="text-light">{loadingMsg}</h1>
            <h2 className="text-light">{loading}%</h2>
            <ProgressBar now={loading} />
        </div>
    );

}
export default Loading;