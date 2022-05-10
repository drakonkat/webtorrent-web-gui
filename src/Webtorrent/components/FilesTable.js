import React, {Component} from "react";
import {Alert, IconButton, LinearProgress, Snackbar, Stack, Tooltip, Typography} from "@mui/material";
import {Attachment, CloudDownload, Download, Upload} from "@mui/icons-material";
import {humanFileSize} from "../utils";


class FilesTable extends Component {
    state = {
        loading: true,
        files: [],
        snackbar: false,
        snackbarMessage: "Adding torrent..."
    }


    componentDidMount() {
        let search = this.props
        this.refreshStatus(search);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.search !== this.props.search) {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId)
            }
            this.timeoutId = setTimeout(this.refreshStatus, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.addingCheck)
    }

    checkAdded = (file, torrentsLenght, executions) => {
        let {torrents} = this.props
        //TODO Handle executions < 20 as a possible error
        let disabled = torrents.length > torrentsLenght || executions > 20
        if (disabled) {
            this.setState({
                snackbar: true,
                snackbarMessage: "Added torrent " + file.title
            }, () => {
                setTimeout(() => {
                    this.setState(p => {
                        return {
                            snackbar: false,
                            snackbarMessage: "Adding torrent..."
                        }
                    }, () => {
                        clearInterval(this.addingCheck)
                    })
                }, 2000)
            })
        }
    }

    refreshStatus = async () => {
        try {
            let {client, search, torrents, navigateBack, searchApi} = this.props
            this.setState({loading: true})
            let res = await searchApi(search);
            this.setState({
                files: res.data.map((file, index) => {
                    let disabled = torrents.some(t => {
                        return t.name.includes(file.title)
                    })
                    return (<Stack
                        key={"FILES_" + index}
                        alignItems={"center"}
                        justifyContent={"center"}
                        direction={"row"}
                        spacing={0}
                        sx={{
                            borderRadius: "10px",
                            padding: "10px",
                            backgroundColor: "background.default",
                            width: "100%"
                        }}>
                        <Stack
                            spacing={0}
                            sx={{
                                width: "100%"
                            }}
                            alignItems={"flex-start"}
                            justifyContent={"flex-start"}
                        >
                            <Typography variant={"body1"}>{file.title}</Typography>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"flex-start"}
                            >
                                <Upload color={"success"} fontSize={"small"}/>
                                <Typography variant={"body1"}>Seed: {file.seeders || file.seed}</Typography>
                                <Download color={"success"} fontSize={"small"}/>
                                <Typography variant={"body1"}>Leech: {file.peers || file.leech}</Typography>
                            </Stack>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"flex-start"}
                            >
                                <Attachment color={"success"} fontSize={"small"}/>
                                <Typography variant={"body1"}>{humanFileSize(file.size || file.filesize)}</Typography>
                            </Stack>
                        </Stack>
                        <Tooltip title={file.title}>
                            <IconButton
                                disabled={disabled}
                                size={"medium"}
                                onClick={() => {
                                    //TODO A volte i link di jackett redirezionano a un magnet
                                    let magnet = file.magneturl || file.magnetlink || file.link
                                    client.addTorrent({magnet})
                                    // navigateBack();
                                    clearInterval(this.addingCheck)
                                    this.setState({
                                        snackbar: false,
                                        snackbatMessage: "Adding torrent..."
                                    }, () => {
                                        this.setState({
                                            snackbar: true,
                                            snackbatMessage: "Adding torrent..."
                                        });
                                    })
                                    var executions = 0;
                                    this.addingCheck = setInterval(() => {
                                        executions += 1;
                                        this.checkAdded(file, torrents.length, executions)
                                    }, 800)
                                }}
                            >
                                <CloudDownload fontSize={"large"} color={disabled ? "disabled" : "success"}/>
                            </IconButton>
                        </Tooltip>
                    </Stack>)
                }), loading: false
            })
        } catch (e) {
            console.error(e)
        } finally {
            if (this.state.loading) {
                this.setState({loading: false})
            }
        }

    }

    render() {
        let {files, loading, snackbar, snackbarMessage} = this.state
        return <Stack sx={{padding: "10px", backgroundColor: "background.paper", height: "100%", overflow: "auto"}}
                      spacing={2}>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                open={snackbar}
                onClose={() => {
                    this.setState({snackbar: false})
                }}
                key={"snackabr"}
                autoHideDuration={null}
            >
                <Alert severity="success" sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {loading && <LinearProgress variant={"indeterminate"} color={"success"}/>}
            {!loading && files}
        </Stack>;
    }
}

FilesTable.defaultProps = {
    navigateBack: () => {
        console.log("NOT IMPLEMENTED navigateBack")
    },
    torrents: [],
    client: {},
    search: null
};

export default FilesTable
