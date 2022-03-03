import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography} from "@mui/material";

class WatchTorrent extends Component {
    state = {}

    componentDidUpdate(prevProps, prevState) {
        let {localClient, file, onClose} = this.props;
        try {
            if (!prevProps.open && this.props.open) {
                let elementToAppend = "div#PREDISPOSING"
                let torrent = localClient.get(file.torrentMagnet)
                console.log("CHECK THIS ERROR: ", this.props, torrent, torrent.files)
                torrent.resume();
                let tempFile = torrent.files.find(f => f.name == file.name);
                tempFile.appendTo(elementToAppend, {maxBlobLength: 2066664530000}, (err, elem) => {
                    if (err) {
                        console.log("Error streaming data: ", err)
                    }
                });
            }
        } catch (e) {
            console.error("Error plaing file: ", e);
            // onClose();
        }
    }

    render() {
        let {file, open, onClose} = this.props;
        return (
            <Dialog open={open} onClose={() => {
                onClose()
            }}>
                <DialogTitle>Watch content</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography variant={"body1"}>
                            {file && file.name}
                        </Typography>
                        <Grid item
                              justifyContent="center"
                              alignItems="center" xs={12}>
                            <div id={"PREDISPOSING"}></div>
                        </Grid>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onClose()
                    }}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

WatchTorrent.defaultProps = {
    localClient: {},
    open: false,
    onClose: () => {
    },
    magnet: ""
}
export default WatchTorrent;
