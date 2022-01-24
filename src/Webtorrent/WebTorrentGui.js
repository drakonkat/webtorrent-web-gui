import React, {Component} from 'react';
import {WebTorrentHelper} from "./WebTorrentHelper";
import {
    Button,
    Container,
    createTheme,
    CssBaseline,
    Divider,
    List,
    Stack,
    TextField,
    ThemeProvider
} from "@mui/material";
import TorrentCard from "./components/TorrentCard";
import {Add, Pause, PlayCircle} from "@mui/icons-material";

export class WebTorrentGui extends Component {

    state = {
        theme: createTheme({
            palette: {
                mode: 'dark'
            }
        }),
        magnet: "magnet:?xt=urn:btih:dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c&dn=Big+Buck+Bunny&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fbig-buck-bunny.torrent",
        torrents: []
    }

    componentDidMount() {
        let {host, port} = this.props
        this.setState({client: new WebTorrentHelper({host, port})}, this.refreshStatus)
        this.interval = setInterval(this.refreshStatus, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    refreshStatus = async () => {
        try {
            let {client} = this.state
            let res = await client.checkStatus();
            console.log("CHECK DATA: ", res.data)
            this.setState({torrents: res.data})
        } catch (e) {
            console.error(e)
        }

    }

    submit = () => {
        let {client, magnet} = this.state;
        client.addTorrent({magnet}).then(() => {
            this.refreshStatus().then(() => {
                this.setState({
                    magnet: ""
                })
            })
        }).catch(console.error)
    }
    resumeAll = () => {
        try {
            let {client, torrents} = this.state;
            torrents.forEach(x => {
                client.addTorrent({magnet: x.magnet})
            })
            this.refreshStatus().catch(console.error)
        } catch (e) {
            console.error(e)
        }
    }
    pauseAll = () => {
        try {
            let {client, torrents} = this.state;
            torrents.forEach(x => {
                client.pauseTorrent({magnet: x.magnet})
            })
            this.refreshStatus().catch(console.error)
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        let {client, torrents, magnet, theme} = this.state;
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container>
                    <Stack direction={"row"} spacing={2}>
                        <TextField
                            id={"magnet"}
                            type="text"
                            variant={"outlined"}
                            value={magnet}
                            onChange={(e) => this.setState({magnet: e.target.value})}
                        />
                        <Button startIcon={<Add/>} variant={"outlined"} onClick={this.submit}>Add</Button>
                        <Button startIcon={<Pause/>} variant={"outlined"} onClick={this.pauseAll}>Pause all</Button>
                        <Button startIcon={<PlayCircle/>} variant={"outlined"} onClick={this.resumeAll}>Resume
                            all</Button>
                    </Stack>
                    {!torrents && <>
                        No data
                    </>
                    }
                    <List sx={{width: '100%'}}>
                        {torrents && torrents.map(torrent => {
                            return (<>
                                <TorrentCard
                                    torrent={torrent}
                                    client={client}
                                    refresh={this.refreshStatus}
                                />
                                <Divider variant="inset" component="li"/>
                            </>)
                        })
                        }
                    </List>
                </Container>
            </ThemeProvider>
        );
    }
}
