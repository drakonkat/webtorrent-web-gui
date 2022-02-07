import React, {Component} from 'react';
import TorrentElement from "./TorrentElement";
import {Grid} from "@mui/material";

class TorrentList extends Component {
    render() {
        let {torrentContent, id} = this.props
        return (<>
            {torrentContent && <Grid
                justifyContent="center"
                alignItems="center" container spacing={0}>
                {torrentContent.map(x => {
                    return <Grid item xs={12} style={{padding: "5px"}}>
                        <TorrentElement file={x}
                                        onClick={() => {
                                            document.getElementById("PREDISPOSING" + id).innerHTML = "";
                                        }}
                                        onError={(e, elem) => {
                                            console.log("Error loading torrent " + x.name + " :", e, elem);
                                            if (e) {
                                                document.getElementById("PREDISPOSING" + id).innerHTML = "";
                                            }
                                        }}
                                        elementToAppend={"div#PREDISPOSING" + id}/>
                    </Grid>;
                })}
                <Grid item
                      justifyContent="center"
                      alignItems="center" xs={12}>
                    <div id={"PREDISPOSING" + id}></div>
                </Grid>
            </Grid>}
        </>);
    }
}

export default TorrentList;
