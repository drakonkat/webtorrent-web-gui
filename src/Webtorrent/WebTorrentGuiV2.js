import React, {Component} from 'react';
import {WebTorrentHelper} from "./WebTorrentHelper";
import {
    Button,
    Checkbox,
    Collapse,
    Container,
    createTheme,
    CssBaseline,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    TableCell,
    TableRow,
    TextField,
    ThemeProvider,
    Tooltip,
    Typography
} from "@mui/material";
import {
    AddCircle,
    Delete,
    DeleteForever,
    Download,
    KeyboardArrowDown,
    KeyboardArrowUp,
    PauseCircle,
    PlayCircle,
    Search,
    Upload
} from "@mui/icons-material";
import {humanFileSize, toTime} from "./utils";
import WebTorrent from "webtorrent";
import {LinearProgressWithLabel} from "./components/LinearProgressWithLabel";

import {Menu} from "./components/Menu";
import AddTorrent from "./components/AddTorrent";
import ConfigDialog from "./components/ConfigDialog";
import TorrentClientTable from "./components/TorrentClientTable";
import FilesTable from "./components/FilesTable";
import {grey} from "@mui/material/colors";
import FileElement from "./components/FileElement";

const defaultTheme = createTheme();
const options = {
    typography: {
        fontSize: 12,
    },
    palette: {
        mode: 'dark',
        background: {
            default: "#303030",
            paper: "#424242"
        }
    },
    components: {
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: "10px"
                }
            }
        },
        MuiListItemButton: {
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
                        paddingTop: "5px",
                    }
                },
            },
        },
    },
};

export class WebTorrentGuiV2 extends Component {

    state = {
        theme: createTheme(options),
        selectedTorrent: [],
        torrents: [],
        filterTorrent: (x) => {
            return true
        },
        showAddTorrent: false,
        showConfig: false,
        showMovies: false,
        showTorrentClient: true,
        localClient: new WebTorrent({destroyStoreOnDestroy: false}),
        configuration: {},
        search: "",
        selected: "overview"

    }

    componentDidMount() {
        let {host, port, baseUrl} = this.props
        this.setState({client: new WebTorrentHelper(baseUrl ? {baseUrl} : {baseUrl: host + ":" + port})}, async () => {
            await this.refreshStatus();
            // if (window.location.search && window.location.search.includes("?magnet=")) {
            //     let magnet = window.location.search.substring(8, window.location.search.length);
            //     this.setState({
            //         defaultMagnet: magnet
            //     })
            // }
        })
        this.interval = setInterval(this.refreshStatus, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    refreshStatus = async () => {
        try {
            let {client, localClient, filterTorrent} = this.state
            let res = await client.checkStatus();
            let confRes = await client.getConf();
            this.setState({torrents: res.data.filter(filterTorrent), configuration: confRes.data})
            res.data.forEach((torrent) => {
                if (localClient.get(torrent.magnet) == null) {
                    localClient.add(torrent.magnet, null, (addedTorrent) => {
                        addedTorrent.on("ready", () => {
                            addedTorrent.pause()
                        });
                    })
                }
            })
        } catch (e) {
            console.error(e)
        }

    }

    removeAll = () => {
        try {
            let {client, torrents, selectedTorrent} = this.state;
            torrents.forEach(x => {
                if (selectedTorrent == null || selectedTorrent.length < 1 || selectedTorrent.includes(x.infoHash)) {
                    client.removeTorrent({magnet: x.magnet})
                }
            })
            this.refreshStatus().catch(console.error)
        } catch (e) {
            console.error(e)
        }
    }

    destroyAll = () => {
        try {
            let {client, torrents, selectedTorrent} = this.state;
            torrents.forEach(x => {
                if (selectedTorrent == null || selectedTorrent.length < 1 || selectedTorrent.includes(x.infoHash)) {
                    client.destroyTorrent({magnet: x.magnet})
                }
            })
            this.refreshStatus().catch(console.error)
        } catch (e) {
            console.error(e)
        }
    }

    resumeAll = () => {
        try {
            let {client, torrents, selectedTorrent} = this.state;
            torrents.forEach(x => {
                if (selectedTorrent == null || selectedTorrent.length < 1 || selectedTorrent.includes(x.infoHash)) {
                    client.addTorrent({magnet: x.magnet})
                }
            })
            this.refreshStatus().catch(console.error)
        } catch (e) {
            console.error(e)
        }
    }
    pauseAll = () => {
        try {
            let {client, torrents, selectedTorrent} = this.state;

            torrents.forEach(x => {
                if (selectedTorrent == null || selectedTorrent.length < 1 || selectedTorrent.includes(x.infoHash)) {
                    client.pauseTorrent({magnet: x.magnet})
                }
            })
            this.refreshStatus().catch(console.error)
        } catch (e) {
            console.error(e)
        }
    }


    render() {
        let {
            client,
            torrents,
            theme,
            configuration,
            localClient,
            selectedTorrent,
            showAddTorrent,
            showConfig,
            showTorrentClient,
            showMovies,
            search,
            selected
        } = this.state;
        let {downloadSpeed, downloadPath, uploadSpeed, actualUpload, actualDownload} = configuration;
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme/>
                <Container maxWidth="false">
                    <Stack
                        sx={{height: "100%"}}
                        direction={"row"}>
                        <Menu
                            selected={selected}
                            onChange={this.darkLightMode}
                            openSettings={this.openSettings}
                            filterDownload={() => {
                                this.setState({
                                    showTorrentClient: true,
                                    showMovies: false,
                                    filterTorrent: (x) => {
                                        return x.paused == false && x.progress != 1;
                                    },
                                    selected: "downloading"
                                }, this.refreshStatus)
                            }}
                            filterSeeding={() => {
                                this.setState({
                                    showTorrentClient: true,
                                    showMovies: false,
                                    filterTorrent: (x) => {
                                        return x.paused == false && x.progress >= 1;
                                    },
                                    selected: "seeding"
                                }, this.refreshStatus)
                            }}
                            filterHome={() => {
                                this.setState({
                                    showTorrentClient: true,
                                    showMovies: false,
                                    filterTorrent: (x) => {
                                        return true;
                                    },
                                    selected: "overview"
                                }, this.refreshStatus)
                            }}
                            switchMovies={() => {
                                this.setState({
                                    showMovies: true,
                                    showTorrentClient: false,
                                    selected: "movies"
                                })
                            }}
                        />
                        <Divider orientation={"vertical"}/>
                        <Stack sx={{width: "100%"}} direction={"column"}>
                            <Stack sx={{width: "100%", padding: "5px"}} alignItems={"center"} spacing={1}
                                   direction={"row"}>
                                <Button size={"small"} color={"primary"} variant={"contained"}
                                        startIcon={<AddCircle/>} onClick={() => {
                                    this.setState({showAddTorrent: true})
                                }}>Add</Button>
                                <Button size={"small"} color={"primary"} variant={"contained"}
                                        startIcon={<PauseCircle/>} onClick={this.pauseAll}>pause</Button>
                                <Button size={"small"} color={"primary"} variant={"contained"}
                                        startIcon={<PlayCircle/>} onClick={this.resumeAll}>Resume</Button>
                                <Tooltip title={"Remove element only from the list"}>
                                    <Button size={"small"} color={"primary"} variant={"contained"}
                                            startIcon={<Delete/>} onClick={this.removeAll}>Remove</Button>
                                </Tooltip>
                                <Tooltip title={"Remove element from list and from the memory"}>
                                    <Button size={"small"} color={"primary"} variant={"contained"}
                                            startIcon={<DeleteForever/>} onClick={this.destroyAll}>Delete</Button>
                                </Tooltip>
                                <Divider orientation={"vertical"}/>
                                <IconButton disabled color={"primary"}><KeyboardArrowUp/></IconButton>
                                <IconButton disabled color={"primary"}><KeyboardArrowDown/></IconButton>
                                <Divider orientation={"vertical"}/>
                                <TextField size={"small"} variant={"outlined"} label={"Search"}
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <Search/>
                                                   </InputAdornment>
                                               )
                                           }}
                                           value={search}
                                           onChange={(e) => {
                                               let text = e.target.value;
                                               this.setState({search: text})
                                           }}
                                />
                                <Typography
                                    sx={{display: "flex", alignItems: "center"}}
                                    variant="body2"
                                >
                                    <Download
                                        fontSize="small"/>{humanFileSize(actualDownload) + "/s"} {humanFileSize(actualUpload) + "/s"}<Upload
                                    fontSize="small"/><br/>
                                </Typography>
                            </Stack>
                            <Divider/>
                            {showMovies && <FilesTable
                                client={client}
                                torrents={torrents}
                                search={search}
                                navigateBack={() => {
                                    this.setState({
                                        showTorrentClient: true,
                                        showMovies: false,
                                        filterTorrent: (x) => {
                                            return true;
                                        },
                                        selected: "overview",
                                        search: ""
                                    }, this.refreshStatus)
                                }}
                                localClient={localClient}
                            />}
                            {showTorrentClient && <TorrentClientTable
                                search={search}
                                onClick={(event) => {
                                    if (event.target.checked) {
                                        this.setState({selectedTorrent: torrents.map(x => x.infoHash)})
                                    } else {
                                        this.setState({selectedTorrent: []})
                                    }
                                }}
                                torrents={torrents}
                                predicate={x => selectedTorrent.includes(x.infoHash)}
                                callbackfn={torrent => {
                                    let state;
                                    let color = "primary";
                                    if (torrent.paused) {
                                        state = "paused";
                                        color = "warning";
                                    } else if (torrent.progress == 1) {
                                        state = "completed";
                                        color = "success";
                                    } else if (torrent.timeRemaining > 0) {
                                        state = toTime(torrent.timeRemaining)
                                    } else {
                                        state = "--:--"
                                    }
                                    let size = 0;
                                    torrent.files.forEach(file => {
                                        size = size + file.length
                                    })
                                    let isRowSelected = this.isRowSelected(torrent.infoHash)
                                    return (<>
                                        <TableRow key={torrent.infoHash} sx={{borderBottom: 'unset'}}>
                                            <TableCell padding={"checkbox"} component="th" scope="row">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isRowSelected}
                                                    onClick={() => this.onChangeRowSelection(torrent.infoHash)}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
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
                                        </TableRow>
                                        <TableRow key={"Secondary-" + torrent.infoHash}>
                                            <TableCell padding={"checkbox"} sx={{paddingBottom: 0, paddingTop: 0}}
                                                       colSpan={6}>
                                                <Collapse in={isRowSelected} timeout="auto" unmountOnExit>
                                                    {torrent.files.map(f => {
                                                        return <FileElement file={f} client={client}/>
                                                    })}
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </>)
                                }}/>}
                        </Stack>
                    </Stack>
                    <AddTorrent
                        open={showAddTorrent}
                        onSubmit={(path, magnet) => {
                            client.addTorrent({magnet, path})
                                .then(this.refreshStatus)
                                .catch(console.error)
                            this.setState({showAddTorrent: false})
                        }}
                        onClose={() => {
                            this.setState({showAddTorrent: false})
                        }}
                    />
                    <ConfigDialog
                        open={showConfig}
                        key={"MODAL: " + downloadSpeed + downloadPath + uploadSpeed}
                        onSubmit={(configuration) => {
                            client.saveConf(configuration)
                            this.setState({showConfig: false})
                        }}
                        onClose={() => {
                            this.setState({showConfig: false})
                        }}
                        downloadPath={downloadPath}
                        downloadSpeed={downloadSpeed}
                        uploadSpeed={uploadSpeed}
                    />
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


    openSettings = () => {
        console.log("CHECK SHOW CONFIG: ", true)
        this.setState({showConfig: true})
    }
    darkLightMode = (e, checked) => {
        let mode = checked ? "dark" : "light";
        let background = {
            default: "#303030",
            paper: "#424242"
        }
        if (mode == "light") {
            background = {
                default: grey[300],
                paper: grey[200]
            }
        }
        this.setState({
            theme: createTheme({
                ...options,
                palette: {
                    ...options.palette,
                    mode,
                    background
                }
            })
        })
    }
}
