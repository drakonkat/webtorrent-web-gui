import React, {useState} from 'react';
import {Box, Grid, IconButton, LinearProgress, ListItem, ListItemText, Tooltip, Typography} from "@mui/material";
import {
    Delete,
    DeleteForever,
    Download,
    PauseCircle,
    PlayCircle,
    ScreenShare,
    StopScreenShare,
    Upload
} from "@mui/icons-material";
import {humanFileSize, round, toTime} from "../utils";
import WebTorrent from "webtorrent";
import TorrentList from "./TorrentList";


function TorrentCard(props) {
    let {torrent, client, refresh} = props;
    let [localClient, setLocalClient] = useState(null);
    let [torrents, setTorrents] = useState(null);
    let [loading, setLoading] = useState(false);
    let size = 0;
    torrent.files.forEach(file => {
        size = size + file.length
    })
    return (
        <ListItem key={torrent.infoHash} alignItems="flex-start">
            <ListItemText
                primary={<Typography
                    sx={{display: "flex"}}
                    variant="body2"
                >
                    {torrent.name} (<Download
                    fontSize="small"/>{humanFileSize(torrent.downloadSpeed) + "/s"} {humanFileSize(torrent.uploadSpeed) + "/s"}<Upload
                    fontSize="small"/>)
                </Typography>}
                secondary={
                    <React.Fragment>
                        <Grid container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              spacing={2}>
                            <Grid item
                                  xs={10}>
                                <LinearProgressWithLabel value={torrent.progress * 100}/>
                            </Grid>
                            <Grid item container xs={2} direction="row"
                                  justifyContent="flex-end"
                            >
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
                                <Tooltip title="Stream torrent">
                                    {!localClient ? <IconButton onClick={() => {
                                        setLoading(true)
                                        localClient = new WebTorrent();
                                        localClient.add(torrent.magnet, {}, async (torrent) => {
                                            setTorrents(torrent)
                                            setLoading(false)
                                        })
                                        localClient.on("error", (err) => {
                                            setLoading(false)
                                            console.error(err)
                                        })
                                        setLocalClient(localClient)
                                    }}>
                                        <ScreenShare/>
                                    </IconButton> : <IconButton onClick={() => {
                                        localClient.destroy();
                                        setLocalClient(null)
                                    }}>
                                        <StopScreenShare/>
                                    </IconButton>}
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Grid container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              spacing={2}>
                            <Grid item>

                                <Typography
                                    variant="body2"
                                >
                                    Ratio: {round(torrent.ratio)}
                                </Typography>
                            </Grid>
                            <Grid item>

                                <Typography
                                    variant="body2"
                                >
                                    Size: {humanFileSize(size)}
                                </Typography>
                            </Grid>
                            <Grid item>

                                <Typography
                                    variant="body2"
                                >
                                    {torrent.timeRemaining > 0 && "Time remaining: " + toTime(torrent.timeRemaining)}
                                </Typography>
                            </Grid>
                        </Grid>
                        {torrents && torrents.files ? <TorrentList torrentContent={torrents.files}/> : null}
                        {loading && <LinearProgress/>}
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
