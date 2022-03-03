import {
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Switch,
    Tooltip,
    Typography
} from "@mui/material";
import {DarkMode, Download, Home, LibraryBooks, LibraryMusic, Movie, Settings, Tv, Upload} from "@mui/icons-material";
import React, {useState} from "react";

export function Menu(props) {
    let [selected, setSelected] = useState("overview");
    return <Stack
        sx={{
            paddingLeft: "10px",
            paddingRight: "10px",
        }}
    >
        <Stack sx={{height: "100%"}} justifyContent={"space-between"}>
            <Stack>
                <List dense={true}>
                    <ListItem>
                        <ListItemText
                            primary="Overview"
                        />
                    </ListItem>
                    <ListItemButton
                        secondaryAction={
                            <Typography variant={"body2"}>0</Typography>
                        }
                        selected={selected == "overview"}
                        onClick={() => {
                            setSelected("overview")
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
                            setSelected("downloading")
                            props.filterDownload()
                        }}
                        secondaryAction={
                            <Typography variant={"body2"}>0</Typography>
                        }
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
                            setSelected("seeding")
                            props.filterSeeding()
                        }}
                        secondaryAction={
                            <Typography variant={"body2"}>0</Typography>
                        }
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
                    <Tooltip title={"Here you can see streamable media from your library"}>
                        <ListItemButton
                            onClick={() => {
                                setSelected("movies")
                                props.switchMovies()
                            }}
                            selected={selected == "movies"}
                            secondaryAction={
                                <Typography variant={"body2"}>0</Typography>
                            }
                        >
                            <ListItemAvatar>
                                <Stack alignItems={"center"} justifyContent={"center"}>
                                    <Movie/>
                                </Stack>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Files"
                            />
                        </ListItemButton>
                    </Tooltip>
                    <ListItemButton
                        disabled
                        secondaryAction={
                            <Typography variant={"body2"}>0</Typography>
                        }
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
                        secondaryAction={
                            <Typography variant={"body2"}>0</Typography>
                        }
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
                        secondaryAction={
                            <Typography variant={"body2"}>0</Typography>
                        }
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
                <ListItem onClick={() => {
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
                </ListItem>
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
