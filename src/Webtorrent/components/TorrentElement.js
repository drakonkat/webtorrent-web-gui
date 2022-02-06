import React, {Component} from 'react';
import mime from "mime";
import {Box, Button, CircularProgress, Tooltip, Typography} from "@mui/material";
import {BlockOutlined, CloudDownloadOutlined, PlayCircleFilled} from "@mui/icons-material";
import {round} from "../utils";

class TorrentElement extends Component {
    state = {
        progress: 0,
        downloadLink: null,
        canBeReproduced: true
    }

    componentDidMount() {
        let {file} = this.props

        this.interval = setInterval(() => {
            let {progress} = this.state
            if (file.progress != 1 || progress != 100) {
                this.setState({
                    progress: round(file.progress * 100)
                });
            } else {
                file.getBlobURL((err, url) => {
                    if (err) {
                        console.error(err.message)
                    }
                    this.setState({downloadLink: url})
                })
            }

        }, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let {file, elementToAppend, elementToRender, onClick, onError} = this.props
        let {progress, downloadLink, canBeReproduced} = this.state
        let mimeTypeTemp = mime.getType(file.name);
        let output;

        if (canBeReproduced && mimeTypeTemp.includes("video") || mimeTypeTemp.includes("image")) {
            output = <Button size={"small"} startIcon={<PlayCircleFilled/>} variant={"outlined"} color={"primary"}
                             onClick={() => {
                                 onClick(file);
                                 if (elementToAppend) {
                                     file.appendTo(elementToAppend, {}, (err, elem) => {
                                         if (onError) {
                                             onError(err, elem)
                                         }
                                         this.setState({canBeReproduced: false})
                                     });
                                 }
                                 if (elementToRender) {
                                     file.renderTo(elementToRender, {}, (err, elem) => {
                                         if (onError) {
                                             onError(err, elem)
                                         }
                                         this.setState({canBeReproduced: false})
                                     });
                                 }
                             }
                             }
                             id={file.name}>{file.name} - {progress}%</Button>
        } else {
            output =
                <Tooltip title={"Cannot be downloaded, wait for the buffering then download it"}><Button size={"small"}
                                                                                                         startIcon={
                                                                                                             <BlockOutlined/>}
                                                                                                         variant={"outlined"}
                                                                                                         color={"primary"}
                                                                                                         id={file.name}>Buffering... {file.name} - <CircularProgressWithLabel
                    value={progress}/></Button></Tooltip>
        }
        return <>{output} - <Button disabled={downloadLink == null} variant={"contained"} color={"primary"}
                                    onClick={() => {
                                        window.open(downloadLink)
                                    }}><CloudDownloadOutlined/></Button> </>;
    }
}

export default TorrentElement;

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{position: 'relative', display: 'inline-flex', paddingLeft: "5px"}}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}
