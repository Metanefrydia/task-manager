import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Card } from "@material-ui/core";
import GroupElement from "./GroupElement";
import AddGroup from "./AddGroup";
import "./group.css";
import GroupService from "../../services/GroupsService";
import AuthenticationService from "../../services/AuthenticationService";

const GroupCard = (props: any) => {
  const [users, setUsers] = useState<any>();
  const [visable, setVisable] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const readUsers = () => {
    AuthenticationService.getUsers().then((response: any) => {
      setUsers(response.data.data.users);
      setLoading(false);
    });
  };

  useEffect(() => {
    readUsers();
  }, []);

  const deleteGroup = (groupIndex: number, groupId: string) => {
    props.data.splice(groupIndex, 1);
    GroupService.deleteGroup(groupId);
    window.location.reload();
  };

  const cancelAdd = () => {
    setVisable(false);
  };

  const onClick = () => {
    setVisable(true);
  };

  if (!isLoading) {
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

          <div className={"inRowInfo"}>
            <p className={"infoText"} style={{ marginLeft: "5%" }}>
              Nazwa
            </p>
            <p className={"infoText"} style={{ marginLeft: "15%" }}>
              Członkowie
            </p>
          </div>

          {props.data.length !== 0 ? (
            props.data.map((group: any, index: any) => {
              return (
                <GroupElement
                  key={group._id}
                  group={group}
                  deleteHandler={() => deleteGroup(index, group._id)}
                  users={users}
                />
              );
            })
          ) : (
            <p>Brak grup</p>
          )}

          {visable ? (
            <AddGroup cancelAdd={() => cancelAdd()} users={users} />
          ) : null}
        </Card>
      </Grid>
    );
  }
  return <p>Ładuje</p>;
};

export default GroupCard;
