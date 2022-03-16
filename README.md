# Webtorrent web gui

### This project need an associated "[Webtorrent express api](https://gitlab.com/tndsite/webtorrent-express-api)" to work

### Prop Types
Props to pass to the UI component

| Property | Type    | Required? | Description                                                                                    |
|:---------|:--------|:---------:|:-----------------------------------------------------------------------------------------------|
| host     | String  |   true    | The host where you run the service. If you start the other project locally is http://localhost |
| port     | Number  |   true    | The port where you run the service. If you start the other project locally is 3000             |
| baseUrl  | String  |   true    | Contains the URL for the API, example "http://localhost:3000"                                  |
| remote   | Boolean |   false   | If true consider the API on a remote machine, and open remote link                             |

### Examples

Here is an example of the use of the component with the UI

```javascript
import {WebTorrentGui} from 'webtorrent-web-gui';


function App() {

    return (
        <div className="App">
            <WebTorrentGui host={"http://localhost"} port={3000}/>
        </div>
    );
}

export default App;
```

### Prop Types

Props to pass to the Linear component

| Property       | Type       | Description                                   |
|:---------------|:-----------|:----------------------------------------------|
| addTorrent     | Data       | Add a torrent to the download list            |
| pauseTorrent   | Data       | Pause a torrent                               |
| removeTorrent  | Data       | Remove a torrent                              |
| destroyTorrent | Data       | Delete a torrent and his data                 |
| checkStatus    | void       | Return the list of the torrent and his status |
| getConf        | void       | Return the actual configuration of the server |
| saveConf       | ConfigData | Save a new configuration for the server       |

#### Data

magnet = Magnet of the torrent

#### ConfigData

downloadPath = Path of the downlaod (Default: "./Downloads/")
downloadSpeed = Speed of the download (Bytes/s)
uploadSpeed = Speed of the upload (Bytes/s)

### Examples

Here is an example of the use of the component with the UI

```javascript
import {WebTorrentHelper} from 'webtorrent-web-gui';

let client = new WebTorrentHelper({host: "http://localhost", port: 3000})
client.addTorrent({magnet: ""})
```

### Run locally

1. Start the project "[Webtorrent express api](https://gitlab.com/tndsite/webtorrent-express-api)"
2. Run ```npm install```
3. Run ```npm run dev```

