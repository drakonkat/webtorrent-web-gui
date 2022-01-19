import {WebTorrentGui} from 'webtorrent-web-gui';


function App() {

    return (
        <div className="App">
            <WebTorrentGui host={"http://localhost"} port={3000}/>
        </div>
    );
}

export default App;
