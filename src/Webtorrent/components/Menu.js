import {
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Switch,
    Tooltip
} from "@mui/material";
import {DarkMode, Download, Home, LibraryBooks, LibraryMusic, Movie, Settings, Tv, Upload} from "@mui/icons-material";
import React from "react";

export function Menu(props) {
    let {selected, logo} = props;
    return <Stack
        sx={{
            paddingLeft: "10px",
            paddingRight: "10px",
        }}
    >
        <Stack sx={{height: "100%"}} justifyContent={"space-between"}>
            <Stack>
                {logo && <img style={{maxWidth: "250px"}} src={logo} alt={"logo"}/>}
                <List dense={true}>
                    <ListItem>
                        <ListItemText
                            primary="Overview"
                        />
                    </ListItem>
                    <ListItemButton

                        selected={selected == "overview"}
                        onClick={() => {
                            props.filterHome()
                        }}
                    >
                        <ListItemAvatar>
                            <Stack alignItems={"center"} justifyContent={"center"}>
                                <Home/>
                            </Stack>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Home"
                        />
                    </ListItemButton>
                    <ListItemButton
                        selected={selected == "downloading"}
                        onClick={() => {
                            props.filterDownload()
                        }}

                    >
                        <ListItemAvatar>
                            <Stack alignItems={"center"} justifyContent={"center"}>
                                <Download/>
                            </Stack>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Downloading"
                        />
                    </ListItemButton>
                    <ListItemButton
                        selected={selected == "seeding"}
                        onClick={() => {
                            props.filterSeeding()
                        }}

                    >
                        <ListItemAvatar>
                            <Stack alignItems={"center"} justifyContent={"center"}>
                                <Upload/>
                            </Stack>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Seeding"
                        />
                    </ListItemButton>
                </List>
                <Divider/>
                <List dense={true}>
                    <ListItem>
                        <ListItemText
                            primary="Explore (Coming soon)"
                        />
                    </ListItem>
                    <Tooltip title={"Explore a list of movies"}>
                        <ListItemButton
                            onClick={() => {
                                props.switchMovies()
                            }}
                            selected={selected == "movies"}
                        >
                            <ListItemAvatar>
                                <Stack alignItems={"center"} justifyContent={"center"}>
                                    <Movie/>
                                </Stack>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Movies"
                            />
                        </ListItemButton>
                    </Tooltip>
                    <ListItemButton
                        disabled

                    >
                        <ListItemAvatar>
                            <Stack alignItems={"center"} justifyContent={"center"}>
                                <Tv/>
                            </Stack>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Series"
                        />
                    </ListItemButton>
                    <ListItemButton
                        disabled

                    >
                        <ListItemAvatar>
                            <Stack alignItems={"center"} justifyContent={"center"}>
                                <LibraryMusic/>
                            </Stack>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Music"
                        />
                    </ListItemButton>
                    <ListItemButton
                        disabled

                    >
                        <ListItemAvatar>
                            <Stack alignItems={"center"} justifyContent={"center"}>
                                <LibraryBooks/>
                            </Stack>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Book"
                        />
                    </ListItemButton>
                </List>
                <Divider/>
            </Stack>
            <Stack>
                <ListItem>
                    <ListItemText
                        primary="Configuration"
                    />
                </ListItem>
                <ListItemButton onClick={() => {
                    if (props.openSettings) {
                        props.openSettings()
                    }
                }}>
                    <ListItemAvatar>
                        <Stack alignItems={"center"} justifyContent={"center"}>
                            <Settings/>
                        </Stack>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Settings"
                    />
                </ListItemButton>
                <ListItem>
                    <ListItemAvatar>
                        <Stack alignItems={"center"} justifyContent={"center"}>
                            <DarkMode/>
                        </Stack>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Dark theme"
                    />
                    <Switch defaultChecked={true} onChange={props.onChange}/>
                </ListItem>
            </Stack>
        </Stack>
    </Stack>;
}
