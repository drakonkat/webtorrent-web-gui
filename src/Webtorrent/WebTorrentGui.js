import React, {Component} from 'react';
import {WebTorrentHelper} from "./WebTorrentHelper";
import Button from "./component/Button";

export class WebTorrentGui extends Component {

    state = {
        magnet: "magnet:?xt=urn:btih:6B73A48F50FB29269CD442244269EBAB4E688E27&dn=Ghostbusters%3A%20Afterlife%20(2021)%20720p%20h264%20Ac3%205.1%20Ita%20Eng%20Sub%20Ita%20Eng-MIRCrew&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Finferno.demonoid.is%3A3391%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2860&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce"
    }

    componentDidMount() {
        this.setState({client: new WebTorrentHelper({host: "http://185.149.22.163", port: 3000})})
    }

    submit = () => {
        let {client, magnet} = this.state;
        client.addTorrent({magnet}).then(console.log).catch(console.error)
    }

    render() {
        let {client, magnet} = this.state;
        return (
            <div>
                <input
                    type="text"
                    value={magnet}
                    onChange={(e) => this.setState({magnet: e.target.value})}
                />
                <Button onClick={this.submit}>Add</Button>
            </div>
        );
    }
}
