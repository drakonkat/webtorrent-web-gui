import {WebTorrentGui} from 'webtorrent-web-gui';


function App() {

    return (
        <div className="App">
            <WebTorrentGui baseUrl={"http://localhost:3000"}/>
        </div>
    );
}

export default App;
