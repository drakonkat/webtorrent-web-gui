import React from 'react';
import {IconButton, Stack, Typography} from "@mui/material";
import {OpenInNew} from "@mui/icons-material";

function FileElement(props) {
    let {client, file} = props;
    return (
        <Stack alignItems={"center"} sx={{width: "100%"}} direction={"row"}>
            <IconButton
                color={"primary"}
                onClick={() => {
                    client.fileOpen(file.id);
                }}>
                <OpenInNew/>
            </IconButton>
            <Typography variant={"body1"}>{file.name}</Typography>
        </Stack>
    );
}

export default FileElement;
