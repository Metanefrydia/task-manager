import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Card, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import "./group.css";
import AuthenticationService from "../../services/service";

const GroupElement = (props: any) => {
  return (
    <Box
      style={{
        padding: "6px",
        marginTop: "10px",
        marginLeft: "4%",
        marginRight: "4%",
        border: "1px solid #DADADA ",
      }}
      display="flex"
      justifyContent="space-between"
    >
      <p className="title-text">{props.group.name}</p>
      <p> Select </p>
      <IconButton aria-label="delete">
        <DeleteIcon
          style={{ color: "red" }}
          fontSize="large"
          onClick={props.deleteHandler}
        />
      </IconButton>
    </Box>
  );
};

export default GroupElement;
