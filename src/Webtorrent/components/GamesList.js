import React, {Component} from "react";
import {IconButton, LinearProgress, Stack, Tooltip, Typography} from "@mui/material";
import {Attachment, CloudDownload, Download, Upload} from "@mui/icons-material";

class GamesList extends Component {
    state = {
        loading: true,
        games: []
    }

    componentDidMount() {
        let search = this.props
        this.refreshStatus("[Fitgirl repack] "+ search);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.search !== this.props.search) {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId)
            }
            this.timeoutId = setTimeout(this.refreshStatus, 1000);
        }
    }

    refreshStatus = async () => {
        try {
            let {client, search, torrents, navigateBack} = this.props
            this.setState({loading: true})
            let res = await client.searchGames(search);
            this.setState({
                games: res.data.map(game => {
                    let disabled = torrents.some(t => {
                        return t.magnet.includes(game.magnets[0])
                    })
                    return (<Stack
                        alignItems={"center"}
                        justifyContent={"center"}
                        direction={"row"}
                        spacing={0}
                        sx={{
                            borderRadius: "10px",
                            padding: "10px",
                            backgroundColor: "background.default",
                            width: "100%"
                        }}
                        key={game.name}>
                        <Stack
                            spacing={0}
                            sx={{
                                width: "100%"
                            }}
                            alignItems={"flex-start"}
                            justifyContent={"flex-start"}
                        >
                            <Typography variant={"body1"}>{game.name}</Typography>
                            {/*<Stack*/}
                            {/*    direction={"row"}*/}
                            {/*    alignItems={"center"}*/}
                            {/*    justifyContent={"flex-start"}*/}
                            {/*>*/}
                            {/*    <Upload color={"success"} fontSize={"small"}/>*/}
                            {/*    <Typography variant={"body1"}>Seed: {file.seed}</Typography>*/}
                            {/*    <Download color={"success"} fontSize={"small"}/>*/}
                            {/*    <Typography variant={"body1"}>Leech: {file.leech}</Typography>*/}
                            {/*</Stack>*/}
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"flex-start"}
                            >
                                <Attachment color={"success"} fontSize={"small"}/>
                                <Typography variant={"body1"}>{game.repackSize}</Typography>
                            </Stack>
                        </Stack>
                        <Tooltip title={game.name}>
                            <IconButton
                                disabled={disabled}
                                size={"medium"}
                                onClick={() => {
                                    client.addTorrent({magnet: game.magnets[0]})
                                    navigateBack();
                                }}
                            >
                                <CloudDownload fontSize={"large"} color={disabled ? "disabled" : "success"}/>
                            </IconButton>
                        </Tooltip>
                    </Stack>)
                }), loading: false
            })
        } catch (e) {
            console.error(e)
        } finally {
            if (this.state.loading) {
                this.setState({loading: false})
            }
        }

    }

    render() {
        let {games, loading} = this.state
        return <Stack sx={{padding: "10px", backgroundColor: "background.paper", height: "100%", overflow: "auto"}}
                      spacing={2}>
            {loading && <LinearProgress variant={"indeterminate"} color={"success"}/>}
            {!loading && games}
        </Stack>;
    }
}

GamesList.defaultProps = {
    navigateBack: () => {
        console.log("NOT IMPLEMENTED navigateBack")
    },
    torrents: [],
    client: {},
    search: null
};

export default GamesList
