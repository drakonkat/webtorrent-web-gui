import React, {useEffect, useState} from 'react';
import {Button, LinearProgress, Stack} from "@mui/material";
import {Add} from "@mui/icons-material";

function Category(props) {
    let [loading, setLoading] = useState(true);
    let [category, setCategory] = useState({});
    const refreshStatus = async () => {
        try {
            let {client} = props
            let res = await client.getCategory();
            setCategory(res.data)
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        refreshStatus().then(() => {
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <LinearProgress variant={"indeterminate"} color={"success"}/>
    }

    return (<Stack
        key={"Container_Content"}
        spacing={2}
        sx={{
            width: "100%"
        }}>
        <Button startIcon={<Add/>} variant={"outlined"} fullWidth>ADD</Button>
    </Stack>);
}

export default Category;
