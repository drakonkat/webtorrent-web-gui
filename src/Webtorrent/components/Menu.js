import {
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import {DarkMode, Download, Home, LibraryBooks, LibraryMusic, Movie, Settings, Tv, Upload} from "@mui/icons-material";
import React from "react";

export function Menu(props) {
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
                    <ListItem
                        secondaryAction={
                            <Typography variant={"body2"}>0</Typography>
                        }
                        selected={true}
                    >
                        <ListItemAvatar>
                            <Stack alignItems={"center"} justifyContent={"center"}>
                                <Home/>
                            </Stack>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Home"
                        />
                    </ListItem>
                    <ListItemButton
                        disabled
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
                        disabled
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
                    <ListItemButton
                        disabled
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
                            primary="Movies"
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
