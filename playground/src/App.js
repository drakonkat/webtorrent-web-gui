import {WebTorrentGui} from 'webtorrent-web-gui';


function App() {

    return (
        <div className="App">
            <WebTorrentGui host={"https://qbit.drakofeature.cf"} port={443}/>
        </div>
    );
}

export default App;
