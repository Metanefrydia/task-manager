import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Card } from "@material-ui/core";
import GroupElement from "./GroupElement";
import AddGroup from "./AddGroup";
import "./group.css";

import AuthenticationService from "../../services/service";

const GroupCard = (props: any) => {
  const [users, setUsers] = useState<any>();
  const [visable, setVisable] = useState(false);

  const readUsers = () => {
    AuthenticationService.getUsers().then((response) => {
      console.log(response.data);
      setUsers(response.data.data.users);
    });
  };

  useEffect(() => {
    readUsers();
  }, []);

  const deleteGroup = (groupIndex: number, groupId: string) => {
    props.data.splice(groupIndex, 1);
    AuthenticationService.deleteGroup(groupId);
    window.location.reload();
  };

  const cancelAdd = () => {
    setVisable(false);
  };

  const onClick = () => {
    setVisable(true);
  };

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
          style={{
            paddingBottom: "0px",
            marginTop: "50px",
            marginLeft: "4%",
            marginRight: "4%",
            marginBottom: "4%",
          }}
          display="flex"
          justifyContent="space-between"
        >
          <p className="title-text">Twoje grupy</p>
          <Button
            onClick={onClick}
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

        {props.data.map((el: any, index: any) => {
          return (
            <GroupElement
              group={el}
              deleteHandler={() => deleteGroup(index, el._id)}
              users={users}
            />
          );
        })}

        {visable ? (
          <AddGroup cancelAdd={() => cancelAdd()} users={users} />
        ) : null}
      </Card>
    </Grid>
  );
};

export default GroupCard;
