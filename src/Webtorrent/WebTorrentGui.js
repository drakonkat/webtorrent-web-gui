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
    Grid,
    List,
    Stack,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import TorrentCard from "./components/TorrentCard";
import {Add, Download, Pause, PlayCircle, Save, Settings, Upload} from "@mui/icons-material";
import {humanFileSize} from "./utils";
import WebTorrent from "webtorrent";

export class WebTorrentGui extends Component {

    state = {
        theme: createTheme({
            palette: {
                mode: 'dark'
            }
        }),
        torrents: [],
        addForm: {},
        expanded: false,
        expandedType: 0,
        localClient: new WebTorrent({destroyStoreOnDestroy: false}),
        configuration: {}
    }

    componentDidMount() {
        let {host, port, baseUrl} = this.props
        this.setState({client: new WebTorrentHelper(baseUrl ? {baseUrl} : {baseUrl: host + ":" + port})}, async () => {
            await this.refreshStatus();
            if (window.location.search && window.location.search.includes("?magnet=")) {
                let magnet = window.location.search.substring(8, window.location.search.length);
                console.debug("Founded magnet: ", magnet)
                this.setState({
                    expanded: true,
                    expandedType: 1,
                    addForm: {
                        magnet: magnet
                    }
                })
            }
        })
        this.interval = setInterval(this.refreshStatus, 3000)
        window.navigator.registerProtocolHandler("magnet",
            window.location.href + "?magnet=%s",
            "TorQuiX");

    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    refreshStatus = async () => {
        try {
            let {client, expanded} = this.state
            let res = await client.checkStatus();
            if (!expanded) {
                let confRes = await client.getConf();
                this.setState({torrents: res.data, configuration: confRes.data})
            } else {
                this.setState({torrents: res.data})
            }
        } catch (e) {
            console.error(e)
        }

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


    renderAddForm = () => {
        let {client, expanded, addForm, configuration} = this.state;
        let {path, magnet} = addForm;
        let {downloadPath} = configuration;
        if (!path) {
            path = downloadPath
        }
        return <Stack spacing={2}>
            Download path<TextField
            id={"path"}
            type="text"
            variant={"outlined"}
            value={path}
            onChange={(e) => this.setState(p => {
                return {addForm: {...p.addForm, path: e.target.value}}
            })}
        /> <br/>
            Magnet <TextField
            id={"magnet"}
            type="text"
            variant={"outlined"}
            value={magnet}
            onChange={(e) => this.setState(p => {
                return {addForm: {...p.addForm, magnet: e.target.value}}
            })}
        /><br/>
            <Button startIcon={<Save/>} variant={"outlined"} onClick={() => {
                client.addTorrent({magnet, path}).then(() => {
                    this.refreshStatus().then(() => {
                        this.setState({
                            addForm: {path: downloadPath}
                        })
                    })
                }).catch(console.error)
                this.setState({expanded: !expanded})
            }}>
                Save and close
            </Button>
        </Stack>;
    }

    getConfigForm = () => {
        let {client, expanded, configuration} = this.state;
        let {downloadSpeed, downloadPath, uploadSpeed} = configuration;
        return <Stack spacing={2}>

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
        </Stack>;
    }

    renderSwitch = () => {
        let {expandedType} = this.state;
        switch (expandedType) {
            case 1:
                return this.renderAddForm()
            case 0:
            default:
                return this.getConfigForm()
        }
    }

    render() {
        let {client, torrents, theme, expanded, configuration, localClient} = this.state;
        let {actualDownload, actualUpload, actualRatio} = configuration;

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container maxWidth="false">
                    <Accordion TransitionProps={{unmountOnExit: true}} expanded={expanded} onChange={() => {
                    }}>
                        <AccordionSummary>
                            <Grid container direction={"row"} justifyContent={"flex-start"} alignItems={"center"}
                                  spacing={2}>
                                <Grid item xs={"auto"} md={"auto"} lg={"auto"}>
                                    <Button size={"small"} startIcon={<Add/>} variant={"outlined"} onClick={() => {
                                        this.setState({expanded: !expanded, expandedType: 1})
                                    }}>
                                        Add
                                    </Button>
                                </Grid>
                                <Grid item xs={"auto"} md={"auto"} lg={"auto"}>
                                    <Button size={"small"} startIcon={<Pause/>} variant={"outlined"}
                                            onClick={this.pauseAll}>
                                        Pause all
                                    </Button>
                                </Grid>
                                <Grid item xs={"auto"} md={"auto"} lg={"auto"}>
                                    <Button size={"small"} startIcon={<PlayCircle/>} variant={"outlined"}
                                            onClick={this.resumeAll}>
                                        Resume all
                                    </Button>
                                </Grid>
                                <Grid item xs={"auto"} md={"auto"} lg={"auto"}>
                                    <Button size={"small"} startIcon={<Settings/>} variant={"outlined"} onClick={() => {
                                        this.setState({expanded: !expanded, expandedType: 0})
                                    }}>
                                        Settings
                                    </Button>
                                </Grid>
                                <Grid item xs={"auto"} md={"auto"} lg={"auto"}>
                                    <Typography
                                        sx={{display: "flex"}}
                                        variant="body2"
                                    >
                                        <Download
                                            fontSize="small"/>{humanFileSize(actualDownload) + "/s"} {humanFileSize(actualUpload) + "/s"}<Upload
                                        fontSize="small"/><br/>
                                        {/*Ratio: {round(actualRatio)}*/}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                            {this.renderSwitch()}
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
                                    localClient={localClient}
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
