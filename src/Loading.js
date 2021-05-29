
const Loading = ({loading, loadingMsg}) => {
    console.log(loading);

    return(
        <div>
            <h1 className="text-light">Loading: {loading}</h1>
            <h2 className="text-light">{loadingMsg}</h2>
        </div>
    );

}
export default Loading;