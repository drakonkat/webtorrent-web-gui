import {WebTorrentGuiV2} from 'webtorrent-web-gui';


function App() {

    return (
        <WebTorrentGuiV2 remote={true} baseUrl={"http://localhost:3000"}/>
    );
}

export default App;
