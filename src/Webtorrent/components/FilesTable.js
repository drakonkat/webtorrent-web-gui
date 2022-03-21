import React, {Component} from "react";
import {IconButton, LinearProgress, Stack, Tooltip, Typography} from "@mui/material";
import {Attachment, CloudDownload, Download, Upload} from "@mui/icons-material";
import {humanFileSize} from "../utils";

class FilesTable extends Component {
    state = {
        loading: true,
        files: []
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

    refreshStatus = async () => {
        try {
            let {client, search, torrents, navigateBack} = this.props
            this.setState({loading: true})
            let res = await client.search(search);
            this.setState({
                files: res.data.map(file => {
                    let disabled = torrents.some(t => {
                        return t.name.includes(file.title)
                    })
                    return (<Stack
                        alignItems={"center"}
                        justifyContent={"center"}
                        direction={"row"}
                        spacing={0}
                        sx={{
                            borderRadius: "10px",
                            padding: "10px",
                            backgroundColor: "background.default",
                            width: "100%"
                        }}
                        key={file.url}>
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
                                <Typography variant={"body1"}>Seed: {file.seed}</Typography>
                                <Download color={"success"} fontSize={"small"}/>
                                <Typography variant={"body1"}>Leech: {file.leech}</Typography>
                            </Stack>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"flex-start"}
                            >
                                <Attachment color={"success"} fontSize={"small"}/>
                                <Typography variant={"body1"}>{humanFileSize(file.filesize)}</Typography>
                            </Stack>
                        </Stack>
                        <Tooltip title={file.title}>
                            <IconButton
                                disabled={disabled}
                                size={"medium"}
                                onClick={() => {
                                    client.addTorrent({magnet: file.magnetlink})
                                    navigateBack();
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
        let {files, loading} = this.state
        return <Stack sx={{padding: "10px", backgroundColor: "background.paper", height: "100%", overflow: "auto"}}
                      spacing={2}>
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
