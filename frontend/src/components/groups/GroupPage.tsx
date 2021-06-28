import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Card } from "@material-ui/core";
import GroupElement from "./GroupElement";
import AddGroup from "./AddGroup";
import "./group.css";
import GroupService from "../../services/GroupsService";
import AuthenticationService from "../../services/AuthenticationService";
import { RouteComponentProps } from "react-router-dom";

interface RouteParams {
  id: string;
}

interface GroupPageInterface extends RouteComponentProps<RouteParams> {}

const GroupPage: React.FC<GroupPageInterface> = (props) => {
  const [groups, setGroups] = useState<any>();
  const [areGroupsLoading, setGroupsLoading] = useState(true);
  const [users, setUsers] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [areUsersLoading, setUsersLoading] = useState(true);

  const readGroups = () => {
    setGroupsLoading(true);
    let id: string = props.match.params.id;
    GroupService.getGroups(id).then((response) => {
      setGroups(response.data);
      setGroupsLoading(false);
      setAddPanelToHide();
    });
  };

  const readUsers = () => {
    AuthenticationService.getUsers().then((response: any) => {
      setUsers(response.data.data.users);
      console.log(users);
      setUsersLoading(false);
    });
  };

  useEffect(() => {
    readGroups();
    readUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteGroup = (groupIndex: number, groupId: string) => {
    groups.data.splice(groupIndex, 1);
    GroupService.deleteGroup(groupId).then((response) => {
      readGroups();
    });
  };

  const setAddPanelToHide = () => {
    setVisible(false);
  };

  const setAddPanelToVisible = () => {
    setVisible(true);
  };

  if (!areUsersLoading && !areGroupsLoading) {
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
              onClick={setAddPanelToVisible}
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
              <span>dodaj grupę</span>
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

          {groups.data.lenth !== 0 ? (
            groups.data.map((group: any, index: any) => {
              return (
                <GroupElement
                  key={group._id}
                  group={group}
                  index={index}
                  deleteHandler={() => deleteGroup(index, group._id)}
                  users={users}
                  readGroups={readGroups}
                />
              );
            })
          ) : (
            <p>Ładuję grupy</p>
          )}

          {visible ? (
            <AddGroup
              setAddPanelToHide={() => setAddPanelToHide}
              users={users}
              readGroups={readGroups}
            />
          ) : null}
        </Card>
      </Grid>
    );
  }
  return <p>Ładuje</p>;
};

export default GroupPage;
