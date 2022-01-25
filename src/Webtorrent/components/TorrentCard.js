import React from 'react';
import {Box, Grid, IconButton, LinearProgress, ListItem, ListItemText, Tooltip, Typography} from "@mui/material";
import {Delete, DeleteForever, PauseCircle, PlayCircle} from "@mui/icons-material";
import {humanFileSize} from "../utils";


function TorrentCard(props) {
    let {torrent, client, refresh} = props;
    let round = (input) => {
        return Math.round(input * 100) / 100
    }
    let toTime = (input) => {
        let date = new Date(0);
        date.setSeconds(input); // specify value for SECONDS here
        return date.toISOString().substr(11, 8);

    }
    let size = 0;
    torrent.files.forEach(file => {
        size = size + file.length
    })
    return (
        <ListItem key={torrent.infoHash} alignItems="flex-start">
            <ListItemText
                primary={torrent.name}
                secondary={
                    <React.Fragment>
                        <Grid container
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                              spacing={2}>
                            <Grid item
                                  xs={10}>
                                <LinearProgressWithLabel value={torrent.progress * 100}/>
                            </Grid>
                            <Grid item xs={2}>
                                {torrent.paused ? <Tooltip title="Resume">
                                        <IconButton onClick={() => {
                                            client.addTorrent({magnet: torrent.magnet}).then(refresh)
                                        }
                                        }>
                                            <PlayCircle/>
                                        </IconButton>
                                    </Tooltip> :
                                    <Tooltip title="Pause">
                                        <IconButton onClick={() => {
                                            client.pauseTorrent({magnet: torrent.magnet}).then(refresh)
                                        }
                                        }>
                                            <PauseCircle/>
                                        </IconButton>
                                    </Tooltip>}
                                <Tooltip title="Delete from list">
                                    <IconButton onClick={() => {
                                        client.removeTorrent({magnet: torrent.magnet}).then(refresh)
                                    }}>
                                        <Delete/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete with data">
                                    <IconButton onClick={() => {
                                        client.destroyTorrent({magnet: torrent.magnet}).then(refresh)
                                    }
                                    }>
                                        <DeleteForever/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Typography
                            sx={{display: 'inline'}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Download speed: {humanFileSize(torrent.downloadSpeed)}/s
                            <br/>
                            Upload speed: {humanFileSize(torrent.uploadSpeed)}/s
                            <br/>
                            Ratio: {round(torrent.ratio)}
                            <br/>
                            Size: {humanFileSize(size)}
                            <br/>
                            {torrent.timeRemaining > 0 && "Time remaining: " + toTime(torrent.timeRemaining)}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

export default TorrentCard;


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{minWidth: 35}}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
