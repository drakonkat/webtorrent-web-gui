import React, {Component} from 'react';
import TorrentElement from "./TorrentElement";
import {Grid} from "@mui/material";

class TorrentList extends Component {
    render() {
        let {torrentContent} = this.props
        return (<>
            {torrentContent && <Grid container spacing={0}>
                {torrentContent.map(x => {
                    return <Grid item xs={12} style={{padding: "5px"}}>
                        <TorrentElement file={x}
                                        onClick={() => {
                                            document.getElementById("PREDISPOSING").innerHTML = "";
                                        }}
                                        elementToAppend={"div#PREDISPOSING"}/>
                    </Grid>;
                })}
                <div id={"PREDISPOSING"}></div>
            </Grid>}
        </>);
    }
}

export default TorrentList;
