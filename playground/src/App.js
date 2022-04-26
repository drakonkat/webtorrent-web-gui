import {WebTorrentGuiV2} from 'webtorrent-web-gui';
import logo from './asset/logo-nobackground.png'

function App() {

    return (
        <WebTorrentGuiV2 logo={logo} remote={true} baseUrl={"http://localhost:3000"}/>
    );
}

export default App;
