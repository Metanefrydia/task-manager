import React from "react";
import {
    Button,
    Grid,
    Box,
    Card,
} from "@material-ui/core";
import GroupElement from "./GroupElement";
import "./group.css";


const GroupCard = () => {

    return (
        <Grid
            container
            alignItems="center"
            direction="column"
            justify="center"
            style={{ minHeight: "90vh" }}
        >
            <Card className="groupStyle" variant="outlined">
                <Box
                    style={{ paddingBottom: "0px", marginTop: "50px", marginLeft: "16%", marginRight: "10%" }}
                    display="flex"
                    justifyContent="space-between"
                >
                    <p className="title-text">Twoje grupy</p>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{
                            backgroundColor: "#303F9F",
                            color: "white",
                            font: "Roboto",
                            fontSize: "14px",
                            fontStyle: "medium",
                        }}
                    >
                        <span className="btn-login-txt">dodaj grupę</span>
                    </Button>
                </Box>

                <GroupElement name={"Rodzina"}/>

            </Card>
        </Grid>
    );
};

export default GroupCard;
