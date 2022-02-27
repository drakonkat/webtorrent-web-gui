import React, {Component} from 'react';
import {WebTorrentHelper} from "./WebTorrentHelper";
import {
    Button,
    Container,
    createTheme,
    CssBaseline,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Stack,
    Switch,
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
    DarkMode,
    Download,
    Home,
    KeyboardArrowDown,
    KeyboardArrowUp,
    LibraryBooks,
    LibraryMusic,
    Movie,
    PauseCircle,
    PlayCircle,
    Save,
    Search,
    Settings,
    Tv,
    Upload
} from "@mui/icons-material";
import {humanFileSize} from "./utils";
import WebTorrent from "webtorrent";
import {LinearProgressWithLabel} from "./components/LinearProgressWithLabel";

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

export class WebTorrentGuiV2 extends Component {

    state = {
        theme: createTheme(options),
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
                        <Stack
                            sx={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                            }}
                        >
                            <Stack sx={{height: "100%"}} justifyContent={"space-between"}>
                                <Stack>
                                    <List dense={true}>
                                        <ListItem>
                                            <ListItemText
                                                primary="Overview"
                                            />
                                        </ListItem>
                                        <ListItem
                                            secondaryAction={
                                                <Typography variant={"body2"}>0</Typography>
                                            }
                                            selected={true}
                                        >
                                            <ListItemAvatar>
                                                <Stack alignItems={"center"} justifyContent={"center"}>
                                                    <Home/>
                                                </Stack>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Home"
                                            />
                                        </ListItem>
                                        <ListItem
                                            secondaryAction={
                                                <Typography variant={"body2"}>0</Typography>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Stack alignItems={"center"} justifyContent={"center"}>
                                                    <Download/>
                                                </Stack>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Downloading"
                                            />
                                        </ListItem>
                                        <ListItem
                                            secondaryAction={
                                                <Typography variant={"body2"}>0</Typography>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Stack alignItems={"center"} justifyContent={"center"}>
                                                    <Upload/>
                                                </Stack>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Seeding"
                                            />
                                        </ListItem>
                                    </List>
                                    <Divider/>
                                    <List dense={true}>
                                        <ListItem>
                                            <ListItemText
                                                primary="Explore"
                                            />
                                        </ListItem>
                                        <ListItem
                                            secondaryAction={
                                                <Typography variant={"body2"}>0</Typography>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Stack alignItems={"center"} justifyContent={"center"}>
                                                    <Movie/>
                                                </Stack>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Movies"
                                            />
                                        </ListItem>
                                        <ListItem
                                            secondaryAction={
                                                <Typography variant={"body2"}>0</Typography>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Stack alignItems={"center"} justifyContent={"center"}>
                                                    <Tv/>
                                                </Stack>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Series"
                                            />
                                        </ListItem>
                                        <ListItem
                                            secondaryAction={
                                                <Typography variant={"body2"}>0</Typography>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Stack alignItems={"center"} justifyContent={"center"}>
                                                    <LibraryMusic/>
                                                </Stack>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Music"
                                            />
                                        </ListItem>
                                        <ListItem
                                            secondaryAction={
                                                <Typography variant={"body2"}>0</Typography>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Stack alignItems={"center"} justifyContent={"center"}>
                                                    <LibraryBooks/>
                                                </Stack>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Book"
                                            />
                                        </ListItem>
                                    </List>
                                    <Divider/>
                                </Stack>
                                <Stack>
                                    <ListItem>
                                        <ListItemText
                                            primary="Configuration"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Stack alignItems={"center"} justifyContent={"center"}>
                                                <Settings/>
                                            </Stack>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Settings"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Stack alignItems={"center"} justifyContent={"center"}>
                                                <DarkMode/>
                                            </Stack>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Dark theme"
                                        />
                                        <Switch defaultChecked={true} onChange={(e, checked) => {
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
                                        }}/>
                                    </ListItem>
                                </Stack>
                            </Stack>
                        </Stack>
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
                                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">Progress</TableCell>
                                            <TableCell align="right">Time left</TableCell>
                                            <TableCell align="right">Size</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            key={1}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Typography variant={"body2"}>The WIRED CD</Typography>
                                            </TableCell>
                                            <TableCell align="right"><LinearProgressWithLabel value={50}/></TableCell>
                                            <TableCell align="right"><Typography
                                                variant={"body2"}>15m</Typography></TableCell>
                                            <TableCell align="right"><Typography
                                                variant={"body2"}>400M</Typography></TableCell>
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


}
