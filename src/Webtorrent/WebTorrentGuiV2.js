import React, {Component} from 'react';
import {WebTorrentHelper} from "./WebTorrentHelper";
import {
    Button,
    Checkbox,
    Container,
    createTheme,
    CssBaseline,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import {
    AddCircle,
    KeyboardArrowDown,
    KeyboardArrowUp,
    PauseCircle,
    PlayCircle,
    Save,
    Search
} from "@mui/icons-material";
import {humanFileSize, toTime} from "./utils";
import WebTorrent from "webtorrent";
import {LinearProgressWithLabel} from "./components/LinearProgressWithLabel";
import * as PropTypes from "prop-types";
import {Menu} from "./components/Menu";

const defaultTheme = createTheme();
const options = {
    typography: {
        fontSize: 12,
    },
    palette: {
        mode: 'dark'
    },
    components: {
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: "10px"
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    height: "100%",
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    height: "100%",
                    [defaultTheme.breakpoints.up('xs')]: {
                        paddingLeft: "0px",
                        paddingRight: "0px",
                    }
                },
            },
        },
    },
};

Menu.propTypes = {onChange: PropTypes.func};

export class WebTorrentGuiV2 extends Component {

    state = {
        theme: createTheme(options),
        selectedTorrent: [],
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
                this.setState({
                    expanded: true,
                    expandedType: 1,
                    addForm: {
                        magnet: magnet
                    }
                })
            }
        })
        // this.interval = setInterval(this.refreshStatus, 3000)
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
                    <Stack
                        sx={{height: "100%"}}
                        direction={"row"}>
                        <Menu
                            onChange={this.darkLightMode}
                        />
                        <Divider orientation={"vertical"}/>
                        <Stack sx={{width: "100%"}} direction={"column"}>
                            <Stack sx={{width: "100%", padding: "5px"}} spacing={1} direction={"row"}>
                                <Button size={"small"} color={"primary"} variant={"contained"}
                                        startIcon={<AddCircle/>}>Add</Button>
                                <Button size={"small"} color={"primary"} variant={"contained"}
                                        startIcon={<PauseCircle/>}>pause</Button>
                                <Button size={"small"} color={"primary"} variant={"contained"}
                                        startIcon={<PlayCircle/>}>Resume</Button>
                                <Divider orientation={"vertical"}/>
                                <IconButton color={"primary"}><KeyboardArrowUp/></IconButton>
                                <IconButton color={"primary"}><KeyboardArrowDown/></IconButton>
                                <Divider orientation={"vertical"}/>
                                <TextField size={"small"} variant={"outlined"} label={"Search"} InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search/>
                                        </InputAdornment>
                                    )
                                }}/>
                            </Stack>
                            <Divider/>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding={"checkbox"}>
                                                <Checkbox color={"primary"}/>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant={"subtitle2"}>
                                                    Name
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant={"subtitle2"}>
                                                    Progress
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant={"subtitle2"}>
                                                    Time left
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant={"subtitle2"}>
                                                    Size
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {torrents && torrents.map(torrent => {
                                            let state;
                                            let color = "primary";
                                            if (torrent.paused) {
                                                state = "paused";
                                                color = "warning";
                                            } else if (torrent.progress == 1) {
                                                state = "completed";
                                                color = "fine";
                                            } else if (torrent.timeRemaining > 0) {
                                                state = toTime(torrent.timeRemaining)
                                            } else {
                                                state = "undefined"
                                            }
                                            let size = 0;
                                            torrent.files.forEach(file => {
                                                size = size + file.length
                                            })
                                            return (<TableRow key={torrent.infoHash}
                                                              onClick={() => this.onChangeRowSelection(torrent.infoHash)}>
                                                <TableCell padding={"checkbox"} component="th" scope="row">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={this.isRowSelected(torrent.infoHash)}
                                                    />
                                                </TableCell>
                                                <TableCell padding={"checkbox"} component="th" scope="row">
                                                    <Typography variant={"body2"}>{torrent.name}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <LinearProgressWithLabel color={color}
                                                                             value={torrent.progress * 100}/>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant={"body2"}>
                                                        {state}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant={"body2"}>
                                                        {humanFileSize(size)}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>)
                                        })
                                        }
                                        <TableRow
                                            key={1}
                                        >

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Stack>
                </Container>
            </ThemeProvider>
        );
    }


    isRowSelected = (infoHash) => {
        let {selectedTorrent} = this.state;
        return selectedTorrent.includes(infoHash);
    }
    onChangeRowSelection = (infoHash) => {
        let {selectedTorrent} = this.state;
        if (this.isRowSelected(infoHash)) {
            this.setState({
                selectedTorrent: selectedTorrent.filter(x => x != infoHash)
            })
        } else {
            selectedTorrent.push(infoHash)
            this.setState({
                selectedTorrent
            })
        }
    }


    darkLightMode = (e, checked) => {
        let mode = checked ? "dark" : "light";
        this.setState({
            theme: createTheme({
                ...options,
                palette: {
                    ...options.palette,
                    mode: mode
                }
            })
        })
    }
}
