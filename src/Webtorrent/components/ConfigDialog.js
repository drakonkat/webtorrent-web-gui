import React, {Component} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";
import {Save} from "@mui/icons-material";
import {humanFileSize} from "../utils";

class ConfigDialog extends Component {
    state = {
        downloadPath: this.props.downloadPath,
        downloadSpeed: this.props.downloadSpeed,
        uploadSpeed: this.props.uploadSpeed
    }

    render() {
        let {open, onSubmit, onClose} = this.props;
        let {downloadPath, downloadSpeed, uploadSpeed} = this.state;
        return (
            <Dialog open={open} onClose={() => {
                onClose()
            }}>
                <DialogTitle>Configuration</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you can configure the client
                    </DialogContentText>
                    <Stack spacing={2}>
                        Download path<TextField
                        id={"downloadPath"}
                        type="text"
                        variant={"outlined"}
                        value={downloadPath}
                        onChange={(e) => this.setState({downloadPath: e.target.value})}
                    /> <br/>
                        Download speed (Bytes/s -1 means unlimited) <TextField
                        id={"downloadSpeed"}
                        type="number"
                        variant={"outlined"}
                        value={downloadSpeed}
                        helperText={downloadSpeed == -1 ? "unlimited" : humanFileSize(downloadSpeed) + "/s"}
                        onChange={(e) => this.setState({downloadSpeed: e.target.value})}
                    /><br/>
                        Upload speed (Bytes/s -1 means unlimited) <TextField
                        id={"uploadSpeed"}
                        type="number"
                        variant={"outlined"}
                        value={uploadSpeed}
                        helperText={uploadSpeed == -1 ? "unlimited" : humanFileSize(uploadSpeed) + "/s"}
                        onChange={(e) => this.setState({uploadSpeed: e.target.value})}
                    />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onClose()
                    }}>Cancel</Button>
                    <Button startIcon={<Save/>} variant={"contained"} onClick={() => {
                        onSubmit({
                            downloadPath, downloadSpeed, uploadSpeed
                        })
                    }}>
                        Save and close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfigDialog.defaultProps = {
    open: false,
    onSubmit: () => {
    },
    onClose: () => {
    }

}
export default ConfigDialog;
