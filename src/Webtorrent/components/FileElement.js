import React from 'react';
import {IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {OpenInNew} from "@mui/icons-material";

function FileElement(props) {
    let {client, file, remote, torrentMagnet} = props;
    if (!remote) {
        remote = false;
    }
    return (
        <Stack alignItems={"center"} sx={{width: "100%"}} direction={"row"}>
            <Tooltip
                title={remote ? "Stream file if in a compatible format, if not when is completed can be downloaded" : "Open file locally (Even if download is not complete)"}>
                <IconButton
                    disabled={(!file.streamable && remote && !file.done)}
                    color={"primary"}
                    onClick={() => {
                        if (file.streamable && remote) {
                            window.open("https://tndsite.gitlab.io/quix-player/?magnet=" + torrentMagnet, "_blank")
                        } else if (remote) {
                            window.open(client.fileStreamLink(file.id, file.name), "_blank")
                        } else {
                            client.fileOpen(file.id);
                        }
                    }}>
                    <OpenInNew/>
                </IconButton>
            </Tooltip>
            <Typography variant={"body1"}>{file.name}</Typography>
        </Stack>
    );
}

export default FileElement;
