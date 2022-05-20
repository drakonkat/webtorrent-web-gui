import React, {useEffect, useState} from 'react';
import {Download, Upload} from "@mui/icons-material";
import {humanFileSize} from "../utils";
import {Tooltip, Typography} from "@mui/material";

function SpeedMeter(props) {
    let [configuration, setConfiguration] = useState({});
    const refreshStatus = async () => {
        try {
            let {client} = props
            let confRes = await client.getConf();
            setConfiguration(confRes.data)
        } catch (e) {
            console.error(e)
        }
    }
    let interval;

    useEffect(() => {
        refreshStatus()
        interval = setInterval(() => {
            refreshStatus()
        }, 5000)
        return clearInterval
    }, [])

    let {
        actualDownload,
        actualUpload,
        downloadSpeed,
        uploadSpeed
    } = configuration

    let colorDownload;
    let tooltipDownload;

    if (downloadSpeed < 0) {
        colorDownload = "success"
        tooltipDownload = "Speed not limited! (You can limit from settings page)";
    } else if (actualDownload >= (downloadSpeed * 0.90)) {
        colorDownload = "error"
        tooltipDownload = "Speed at his limit! (Raise the limit from settings page)";
    } else if (actualDownload >= (downloadSpeed * 0.75)) {
        colorDownload = "warning"
        tooltipDownload = "Speed near to the limit! (Raise the limit from settings page)";
    } else {
        colorDownload = "success"
        tooltipDownload = "Speed not at his limit, everything is fine";
    }
    let colorUpload;
    let tooltipUpload;
    if (uploadSpeed < 0) {
        colorUpload = "success"
        tooltipUpload = "Unlimited speed, thanks! (You can limit from settings page, but remember sharing is caring!)";
    } else if (actualUpload >= (uploadSpeed * 0.90)) {
        colorUpload = "error"
        tooltipUpload = "Speed at his limit! (Raise the limit from settings page)";
    } else if (actualUpload >= (uploadSpeed * 0.75)) {
        colorUpload = "warning"
        tooltipUpload = "Speed near to the limit! (Raise the limit from settings page)";
    } else {
        colorUpload = "success"
        tooltipUpload = "Speed not at his limit, thanks for sharing bandwidth!";
    }

    return (
        <Typography
            sx={{display: "flex", alignItems: "center"}}
            variant="body2"
        >
            <Tooltip title={tooltipDownload}>
                <Download
                    color={colorDownload}
                    fontSize="small"/>
            </Tooltip>
            {humanFileSize(actualDownload) + "/s"} {humanFileSize(actualUpload) + "/s"}
            <Tooltip title={tooltipUpload}>
                <Upload
                    color={colorUpload}
                    fontSize="small"/>
            </Tooltip>
        </Typography>
    );
}

export default SpeedMeter;
