import React, {Component} from "react";
import {
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

class TorrentClientTable extends Component {
    render() {
        let {onClick, torrents, predicate, callbackfn, search} = this.props
        return <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell padding={"checkbox"}>
                            <Checkbox
                                onClick={onClick}
                                checked={torrents.every(predicate)}
                                color={"primary"}/>
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
                        <TableCell align="left">
                            <Typography variant={"subtitle2"}>
                                Time left
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography variant={"subtitle2"}>
                                Size
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant={"subtitle2"}>
                                Actions
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {torrents && torrents.filter(x => x.name && x.name.includes(search)).map(callbackfn)}
                </TableBody>
            </Table>
        </TableContainer>;
    }
}

TorrentClientTable.defaultProps = {
    onClick: () => {
    },
    torrents: [],
    predicate: () => {

    },
    callbackfn: () => {

    }
};

export default TorrentClientTable
