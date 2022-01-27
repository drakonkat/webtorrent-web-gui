import React, {Component} from 'react';
import {WebTorrentHelper} from "./WebTorrentHelper";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
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
import {Add, Pause, PlayCircle, Save, Settings} from "@mui/icons-material";
import {humanFileSize} from "./utils";

export class WebTorrentGui extends Component {

    state = {
        theme: createTheme({
            palette: {
                mode: 'dark'
            }
        }),
        magnet: "",
        torrents: [],
        expanded: false,
        configuration: {}
    }

    componentDidMount() {
        let {host, port, baseUrl} = this.props
        this.setState({client: new WebTorrentHelper(baseUrl ? {baseUrl} : {baseUrl: host + ":" + port})}, () => {
            this.refreshStatus()
            this.getConfig()
        })
        this.interval = setInterval(this.refreshStatus, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    refreshStatus = async () => {
        try {
            let {client} = this.state
            let res = await client.checkStatus();
            this.setState({torrents: res.data})
        } catch (e) {
            console.error(e)
        }

    }
    getConfig = async () => {
        try {
            let {client} = this.state
            let res = await client.getConf();
            this.setState({configuration: res.data})
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
        let {client, torrents, magnet, theme, expanded, configuration} = this.state;
        let {downloadSpeed, downloadPath, uploadSpeed} = configuration;
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container>
                    <Accordion TransitionProps={{unmountOnExit: true}} expanded={expanded} onChange={() => {
                    }}>
                        <AccordionSummary>
                            <Stack direction={"row"} spacing={2}>
                                <TextField
                                    id={"magnet"}
                                    label={"magnet"}
                                    type="text"
                                    variant={"outlined"}
                                    value={magnet}
                                    onChange={(e) => this.setState({magnet: e.target.value})}
                                />
                                <Button startIcon={<Add/>} variant={"outlined"} onClick={this.submit}>
                                    Add
                                </Button>
                                <Button startIcon={<Pause/>} variant={"outlined"} onClick={this.pauseAll}>
                                    Pause all
                                </Button>
                                <Button startIcon={<PlayCircle/>} variant={"outlined"} onClick={this.resumeAll}>
                                    Resume all
                                </Button>
                                <Button startIcon={<Settings/>} variant={"outlined"} onClick={() => {
                                    this.setState({expanded: !expanded})
                                }}>
                                    Settings
                                </Button>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>

                                Download path<TextField
                                id={"downloadPath"}
                                type="text"
                                variant={"outlined"}
                                value={downloadPath}
                                onChange={(e) => this.setState(p => {
                                    return {configuration: {...p.configuration, downloadPath: e.target.value}}
                                })}
                            /> <br/>
                                Download speed (Bytes/s -1 means unlimited) <TextField
                                id={"downloadSpeed"}
                                type="number"
                                variant={"outlined"}
                                value={downloadSpeed}
                                helperText={downloadSpeed == -1 ? "unlimited" : humanFileSize(downloadSpeed) + "/s"}
                                onChange={(e) => this.setState(p => {
                                    return {configuration: {...p.configuration, downloadSpeed: e.target.value}}
                                })}
                            /><br/>
                                Upload speed (Bytes/s -1 means unlimited) <TextField
                                id={"uploadSpeed"}
                                type="number"
                                variant={"outlined"}
                                value={uploadSpeed}
                                helperText={uploadSpeed == -1 ? "unlimited" : humanFileSize(uploadSpeed) + "/s"}
                                onChange={(e) => this.setState(p => {
                                    return {configuration: {...p.configuration, uploadSpeed: e.target.value}}
                                })}
                            /><br/>
                                <Button startIcon={<Save/>} variant={"outlined"} onClick={() => {
                                    client.saveConf(configuration)
                                    this.setState({expanded: !expanded})
                                }}>
                                    Save and close
                                </Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    {!torrents && <>
                        No data
                    </>
                    }
                    <List sx={{width: '100%'}}>
                        {torrents && torrents.map(torrent => {
                            return (<>
                                <TorrentCard
                                    key={torrent.infoHash}
                                    torrent={torrent}
                                    client={client}
                                    refresh={this.refreshStatus}
                                />
                                <Divider key={torrent.infoHash + "-divider"} variant="inset" component="li"/>
                            </>)
                        })
                        }
                    </List>
                </Container>
            </ThemeProvider>
        );
    }
}
