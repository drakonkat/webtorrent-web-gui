import React from 'react';
import {Box, LinearProgress, ListItem, ListItemText, Typography} from "@mui/material";

function TorrentCard(props) {
    let {torrent} = props;
    let round = (input) => {
        return Math.round(input * 100) / 100
    }
    return (
        <ListItem key={torrent.infoHash} alignItems="flex-start">
            <ListItemText
                primary={torrent.name}
                secondary={
                    <React.Fragment>
                        <LinearProgressWithLabel value={torrent.progress * 100}/>
                        <Typography
                            sx={{display: 'inline'}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Download speed: {round(torrent.downloadSpeed / 1000)}Kb/s
                            <br/>
                            Upload speed: {round(torrent.uploadSpeed / 1000)}Kb/s
                            <br/>
                            Ratio: {round(torrent.ratio)}
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
