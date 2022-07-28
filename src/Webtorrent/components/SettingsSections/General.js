import React, {useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    LinearProgress,
    Stack,
    Switch,
    TextField,
    Typography
} from "@mui/material";
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
            let data = {
                ...confRes.data,
                alternativeTimeStart: confRes.data.alternativeTimeStart ? confRes.data.alternativeTimeStart.slice(0, 5) : null,
                alternativeTimeEnd: confRes.data.alternativeTimeEnd ? confRes.data.alternativeTimeEnd.slice(0, 5) : null,
            }
            setConfiguration(data)
            setDefaultConfiguration(data)
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
        downloadPath,
        download,
        upload,
        alternativeTimeStart,
        alternativeTimeEnd,
        alternativeDownload,
        alternativeUpload,
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
                    id={"download"}
                    type="number"
                    variant={"outlined"}
                    value={download > 0 ? download / 1000 : download}
                    helperText={<FormControlLabel
                        control={<Checkbox onChange={(e) => {
                            if (e.target.checked) {
                                setConfiguration({...configuration, download: -1})
                            } else {
                                setConfiguration({...configuration, download: 8000000})
                            }
                        }}
                                           checked={download == -1}
                        />}
                        label={"Check for unlimited (" + humanFileSize(download, true) + "/s)"}
                        labelPlacement="end"
                    />}
                    // helperText={download == -1 ? "unlimited" : humanFileSize(download) + "/s"}
                    onChange={(e) => {
                        setConfiguration({...configuration, download: Math.max(-1, e.target.value * 1000)})
                    }}

                />
            </Grid>
            <Grid item>
                <Typography variant={"subtitle2"}> Upload speed (Bytes/s -1 means unlimited)</Typography>
                <TextField
                    id={"upload"}
                    type="number"
                    variant={"outlined"}
                    value={upload > 0 ? upload / 1000 : upload}
                    helperText={<FormControlLabel
                        control={<Checkbox onChange={(e) => {
                            if (e.target.checked) {
                                setConfiguration({...configuration, upload: -1})
                            } else {
                                setConfiguration({...configuration, upload: 8000000})
                            }
                        }}
                                           checked={upload == -1}
                        />}
                        label={"Check for unlimited (" + humanFileSize(upload, true) + "/s)"}
                        labelPlacement="end"
                    />}
                    onChange={(e) => setConfiguration({
                        ...configuration, upload: Math.max(-1, e.target.value * 1000)
                    })}
                />
            </Grid>
            <Grid item>
                <Typography variant={"subtitle2"}>Alternative speed limit</Typography>
                <FormControlLabel
                    control={<Switch color="primary"
                                     checked={!!alternativeTimeStart}
                                     onChange={(e) => {
                                         if (e.target.checked) {
                                             let tempStart = new Date();
                                             tempStart.setMinutes(0);
                                             let tempEnd = new Date();
                                             tempEnd.setMinutes(0);
                                             tempEnd.setHours(Math.min(tempStart.getHours() + 1, 23));
                                             setConfiguration({
                                                 ...configuration,
                                                 alternativeTimeStart: tempStart.toLocaleTimeString().slice(0, 5),
                                                 alternativeTimeEnd: tempEnd.toLocaleTimeString().slice(0, 5),
                                                 alternativeUpload: upload,
                                                 alternativeDownload: download
                                             })
                                         } else {
                                             setConfiguration({
                                                 ...configuration,
                                                 alternativeTimeStart: null,
                                                 alternativeTimeEnd: null,
                                                 alternativeUpload: null,
                                                 alternativeDownload: null
                                             })
                                         }
                                     }}/>}
                    label="Enabled"
                />
            </Grid>
            {!!alternativeTimeStart && <>
                <Grid item>
                    <Typography variant={"subtitle2"}>Alternative start time</Typography>
                    <TextField
                        id={"startTime"}
                        type="time"
                        variant={"outlined"}
                        value={alternativeTimeStart}
                        onChange={(e) => setConfiguration({
                            ...configuration, alternativeTimeStart: e.target.value
                        })}
                    />
                </Grid>
                <Grid item>
                    <Typography variant={"subtitle2"}>Alternative end time</Typography>
                    <TextField
                        id={"endTime"}
                        type="time"
                        variant={"outlined"}
                        value={alternativeTimeEnd}
                        onChange={(e) => setConfiguration({
                            ...configuration, alternativeTimeEnd: e.target.value
                        })}
                    />
                </Grid>
                <Grid item>
                    <Typography variant={"subtitle2"}> Alternative download speed (Kb/s) </Typography>
                    <TextField
                        id={"alternativeDownload"}
                        type="number"
                        variant={"outlined"}
                        value={alternativeDownload > 0 ? alternativeDownload / 1000 : alternativeDownload}
                        helperText={<FormControlLabel
                            control={<Checkbox onChange={(e) => {
                                if (e.target.checked) {
                                    setConfiguration({...configuration, alternativeDownload: -1})
                                } else {
                                    setConfiguration({...configuration, alternativeDownload: 8000000})
                                }
                            }}
                                               checked={alternativeDownload == -1}
                            />}
                            label={"Check for unlimited (" + humanFileSize(alternativeDownload, true) + "/s)"}
                            labelPlacement="end"
                        />}
                        onChange={(e) => {
                            setConfiguration({
                                ...configuration,
                                alternativeDownload: Math.max(-1, e.target.value * 1000)
                            })
                        }}

                    />
                </Grid>
                <Grid item>
                    <Typography variant={"subtitle2"}> Alternative upload speed (Bytes/s -1 means
                        unlimited)</Typography>
                    <TextField
                        id={"alternativeUpload"}
                        type="number"
                        variant={"outlined"}
                        value={alternativeUpload > 0 ? alternativeUpload / 1000 : alternativeUpload}
                        helperText={<FormControlLabel
                            control={<Checkbox onChange={(e) => {
                                if (e.target.checked) {
                                    setConfiguration({...configuration, upload: -1})
                                } else {
                                    setConfiguration({...configuration, upload: 8000000})
                                }
                            }}
                                               checked={alternativeUpload == -1}
                            />}
                            label={"Check for unlimited (" + humanFileSize(alternativeUpload, true) + "/s)"}
                            labelPlacement="end"
                        />}
                        onChange={(e) => setConfiguration({
                            ...configuration, alternativeUpload: Math.max(-1, e.target.value * 1000)
                        })}
                    />
                </Grid>
            </>}
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
