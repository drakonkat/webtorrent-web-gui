import React, {useEffect, useState} from 'react';
import {Button, Checkbox, FormControlLabel, Grid, LinearProgress, Stack, TextField, Typography} from "@mui/material";
import {humanFileSize} from "../../utils";
import {Save} from "@mui/icons-material";

function General(props) {
    let [loading, setLoading] = useState(true);
    let [configuration, setConfiguration] = useState({});
    let [defaultConfiguration, setDefaultConfiguration] = useState({});
    const refreshStatus = async () => {
        try {
            let {client} = props
            let confRes = await client.getConf();
            setConfiguration(confRes.data)
            setDefaultConfiguration(confRes.data)
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        refreshStatus().then(() => {
            setLoading(false)
        })
    }, [])

    let {
        downloadPath, downloadSpeed, uploadSpeed
    } = configuration
    if (loading) {
        return <LinearProgress variant={"indeterminate"} color={"success"}/>
    }

    return (<Stack
        key={"Container_Content"}
        spacing={2}
        sx={{
            width: "100%"
        }}>
        <Grid container spacing={2} justifyContent={"space-around"}>
            <Grid item>
                <Typography variant={"subtitle2"}>Download path</Typography>
                <TextField
                    multiline
                    id={"downloadPath"}
                    type="text"
                    variant={"outlined"}
                    value={downloadPath}
                    onChange={(e) => setConfiguration({...configuration, downloadPath: e.target.value})}
                />
            </Grid>
            <Grid item>
                <Typography variant={"subtitle2"}> Download speed (Kb/s) </Typography>
                <TextField
                    id={"downloadSpeed"}
                    type="number"
                    variant={"outlined"}
                    value={downloadSpeed > 0 ? downloadSpeed / 1000 : downloadSpeed}
                    helperText={<FormControlLabel
                        control={<Checkbox onChange={(e) => {
                            if (e.target.checked) {
                                setConfiguration({...configuration, downloadSpeed: -1})
                            } else {
                                setConfiguration({...configuration, downloadSpeed: 8000000})
                            }
                        }}
                                           checked={downloadSpeed == -1}
                        />}
                        label={"Check for unlimited (" + humanFileSize(downloadSpeed, true) + "/s)"}
                        labelPlacement="end"
                    />}
                    // helperText={downloadSpeed == -1 ? "unlimited" : humanFileSize(downloadSpeed) + "/s"}
                    onChange={(e) => {
                        setConfiguration({...configuration, downloadSpeed: Math.max(-1, e.target.value * 1000)})
                    }}

                />
            </Grid>
            <Grid item>
                <Typography variant={"subtitle2"}> Upload speed (Bytes/s -1 means unlimited)</Typography>
                <TextField
                    id={"uploadSpeed"}
                    type="number"
                    variant={"outlined"}
                    value={uploadSpeed > 0 ? uploadSpeed / 1000 : uploadSpeed}
                    helperText={<FormControlLabel
                        control={<Checkbox onChange={(e) => {
                            if (e.target.checked) {
                                setConfiguration({...configuration, uploadSpeed: -1})
                            } else {
                                setConfiguration({...configuration, uploadSpeed: 8000000})
                            }
                        }}
                                           checked={uploadSpeed == -1}
                        />}
                        label={"Check for unlimited (" + humanFileSize(uploadSpeed, true) + "/s)"}
                        labelPlacement="end"
                    />}
                    onChange={(e) => setConfiguration({
                        ...configuration, uploadSpeed: Math.max(-1, e.target.value * 1000)
                    })}
                />
            </Grid>
        </Grid>
        <Stack direction={"row"} justifyContent={"flex-end"}>
            <Button disabled={defaultConfiguration === configuration} startIcon={<Save/>} variant={"contained"}
                    onClick={() => {
                        props.client.saveConf(configuration).then(refreshStatus)
                    }}>
                Save
            </Button>

        </Stack>
    </Stack>);
}

export default General;
