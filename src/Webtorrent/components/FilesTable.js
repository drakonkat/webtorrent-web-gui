import React, {Component} from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import WatchTorrent from "./WatchTorrent";
import {PlayCircleFilled} from "@mui/icons-material";

class FilesTable extends Component {
    state = {
        files: [],
        showWatchDialog: false,
        file: null
    }

    componentDidMount() {
        this.refreshStatus();
        this.interval = setInterval(this.refreshStatus, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    refreshStatus = async () => {
        try {
            let {client, localClient} = this.props
            let res = await client.listFiles();
            this.setState({files: res.data})
        } catch (e) {
            console.error(e)
        }

    }

    render() {
        let {client, localClient} = this.props
        let {files, showWatchDialog, file} = this.state
        return <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant={"subtitle2"}>
                                Name
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant={"subtitle2"}>
                                Streamable
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant={"subtitle2"}>
                                Downloaded
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files && files.map(file => {
                        let canBeStreamed = file.streamable && file.done;
                        let onClick = () => {
                            client.fileOpen(file.id);
                        };
                        if (canBeStreamed) {
                            onClick = () => {
                                client.fileOpen(file.id);
                                //TODO Stream locally
                                // this.setState({showWatchDialog: true, file: file})
                            }
                        }
                        return (<TableRow key={file.id}
                                          onClick={onClick}>
                            <TableCell component="th" scope="row">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <PlayCircleFilled/>
                                    <Typography variant={"body2"}>{file.name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant={"body2"}>{file.streamable ? "true" : false}</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant={"body2"}>
                                    {file.done ? "true" : "false"}
                                </Typography>
                            </TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
            <WatchTorrent
                open={showWatchDialog}
                onClose={() => {
                    this.setState({showWatchDialog: false, file: null})
                }}
                localClient={localClient}
                file={file}
            />
        </TableContainer>;
    }
}

FilesTable.defaultProps = {
    onClick: () => {
    },
    torrents: [],
    predicate: () => {
    },
    callbackfn: () => {

    }
};

export default FilesTable
