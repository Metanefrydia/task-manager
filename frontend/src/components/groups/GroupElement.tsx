import React from "react";
import {
    Button,
    Grid,
    Box,
    Card, IconButton,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
import "./group.css";


const GroupElement = (props) => {

    return (

                <Box
                    style={{ paddingBottom: "0px", marginTop: "50px", marginLeft: "16%", marginRight: "10%" }}
                    display="flex"
                    justifyContent="space-between"
                >
                    <p className="title-text">{props.name}</p>
                    <p> Select </p>
                    <IconButton aria-label="delete">
                        <DeleteIcon style={{ color: "red"}}/>
                    </IconButton>

                </Box>
    );

};

export default GroupElement;
