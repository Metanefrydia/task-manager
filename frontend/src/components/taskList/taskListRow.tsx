import React, { useEffect } from "react";
import TableRow from "@material-ui/core/TableRow";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  ListItemText,
  TextField,
  withStyles,
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "./taskListRow.css";
import "./taskList.css";
import MuiTableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AuthenticationService from "../../services/AuthenticationService";
import TaskService from "../../services/TaskService";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";

const TableCell = withStyles(() => ({
  root: {
    height: 10,
    padding: 3,
  },
}))(MuiTableCell);

interface Members {
  members: Member[];
}

class Member {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function TableRowComponent(props: any) {
  const [buttonState, setButtonState] = React.useState({
    statusText: props.status,
    statusStyle: props.style,
    person: "przypisz osobe",
    personId: "",
  });

  const [editState, setEditState] = React.useState({
    taskNameClicked: false,
    editted: false,
    taskName: props.title,
  });

  const [editDescriptionState, setEditDescriptionState] = React.useState({
    editted: false,
    descriptionClicked: false,
    description: props.description,
  });

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const [users, setUsers] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [members, setMembers] = React.useState<Members>({
    members: [] as Member[],
  });
  const [membersName, setMembersName] = React.useState<string[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteTask = () => {
    TaskService.deleteTask(props._id).then(() => props.handleDelete());
  };

  const handleClickPerson = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClosePerson = () => {
    setAnchorEl2(null);
  };

  const handlePersonMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    // @ts-ignore
    let id = "";
    members.members.map((member) => {
      if (member.name === event.currentTarget.id) {
        id = member.id;
      }
    });

    setButtonState({
      ...buttonState,
      person: event.currentTarget.id,
      personId: id,
    });
    handleClosePerson();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.id === "1") {
      setButtonState({
        ...buttonState,
        statusText: "W trakcie",
        statusStyle: {
          backgroundColor: "#FFEF62",
          fontWeight: "bold" as "bold",
          width: "100%",
          color: "black",
        },
      });
      handleClose();
    } else if (event.currentTarget.id === "2") {
      setButtonState({
        ...buttonState,
        statusText: "Wykonano",
        statusStyle: {
          backgroundColor: "#33EB91",
          fontWeight: "bold" as "bold",
          width: "100%",
          color: "black",
        },
      });
      handleClose();
    } else if (event.currentTarget.id === "3") {
      setButtonState({
        ...buttonState,
        statusText: "Do zrobienia",
        statusStyle: {
          backgroundColor: "#CFCFCF",
          fontWeight: "bold" as "bold",
          width: "100%",
          color: "black",
        },
      });
      handleClose();
    } else {
      setButtonState({
        ...buttonState,
        statusText: "Wstrzymano",
        statusStyle: {
          backgroundColor: "#F1503A",
          fontWeight: "bold" as "bold",
          width: "100%",
          color: "black",
        },
      });
      handleClose();
    }
  };

  const handleNameClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!editState.taskNameClicked) {
      setEditState({ ...editState, taskNameClicked: true });
    }
  };

  const handleDescriptionClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!editDescriptionState.descriptionClicked) {
      setEditDescriptionState({
        ...editDescriptionState,
        descriptionClicked: true,
      });
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditState({ ...editState, taskName: event.target.value });
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setEditState({ ...editState, editted: true, taskNameClicked: false });
    }
  };

  const handleEsc = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setEditState({ ...editState, editted: true, taskNameClicked: false });
    }
  };

  const handleDescriptionInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditDescriptionState({
      ...editDescriptionState,
      description: event.target.value,
    });
  };

  const handleDescriptionEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setEditDescriptionState({
        ...editDescriptionState,
        editted: true,
        descriptionClicked: false,
      });
    }
  };

  const handleDescriptionEsc = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Escape") {
      setEditDescriptionState({
        ...editDescriptionState,
        editted: true,
        descriptionClicked: false,
      });
    }
  };

  useEffect(() => {
    const getUserName = () => {
      let membersNameArr: string[] = [];
      let memberArr: Member[] = [];
      AuthenticationService.getUsers().then((response) => {
        setUsers(response.data.data);

        response.data.data.users.map((user: any) => {
          if (user._id === props.assignee) {
            setButtonState({
              ...buttonState,
              person: user.name,
              personId: user._id,
            });
          }

          props.tableGroup.members.map((member: any) => {
            if (user._id === member) {
              memberArr.push(new Member(user.name, user._id));
              membersNameArr.push(user.name);
            }
          });
        });

        setMembers({ ...members, members: memberArr });
        setMembersName(membersNameArr);

        setLoading(false);
      });
    };

    getUserName();
  }, []);

  useEffect(() => {
    if (!isLoading && buttonState.personId === "") {
      TaskService.editTask({
        _id: props._id,
        title: editState.taskName,
        description: editDescriptionState.description,
        status: buttonState.statusText,
      });
    } else if (!isLoading) {
      TaskService.editTask({
        _id: props._id,
        title: editState.taskName,
        description: editDescriptionState.description,
        status: buttonState.statusText,
        assignee: buttonState.personId,
      });
    }
  }, [
    editState.editted,
    editDescriptionState.editted,
    buttonState.person,
    buttonState.statusText,
  ]);

  return isLoading ? (
    <div>ładowanie</div>
  ) : (
    <>
      <TableRow className="row">
        <TableCell
          id={"color"}
          className="color-rec"
          style={{ backgroundColor: props.color }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {editState.taskNameClicked ? (
          <TableCell onClick={handleNameClick} className="title-row">
            <TextField
              id={"change-name-field"}
              autoFocus={true}
              style={{ width: "100%" }}
              onChange={handleInput}
              onKeyPress={handleEnter}
              onKeyDown={handleEsc}
              value={editState.taskName}
            ></TextField>
          </TableCell>
        ) : (
          <TableCell
            id={"name"}
            className="task-text"
            component="th"
            scope="row"
            onClick={handleNameClick}
          >
            {editState.taskName}
          </TableCell>
        )}

        <TableCell id={"person"} className="person-text" align="center">
          <Button
            style={{ width: "50px" }}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClickPerson}
          >
            <span style={{ textTransform: "none" }}>{buttonState.person}</span>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleClosePerson}
          >
            {membersName.map((member: any) => (
              <MenuItem
                id={member}
                key={member}
                onClick={handlePersonMenuClick}
              >
                {member}
              </MenuItem>
            ))}
          </Menu>
        </TableCell>

        <TableCell id={"status"} className="status-row" align="center">
          <div>
            <Button
              id={"menuButton"}
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={handleClick}
              style={buttonState.statusStyle}
            >
              {buttonState.statusText}
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem>
                <ListItemText
                  id={"1"}
                  onClick={handleMenuClick}
                  primary="W trakcie"
                />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText
                  id={"2"}
                  onClick={handleMenuClick}
                  primary="Wykonano"
                />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText
                  id={"3"}
                  onClick={handleMenuClick}
                  primary="Do zrobienia"
                />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText
                  id={"4"}
                  onClick={handleMenuClick}
                  primary="Wstrzymano"
                />
              </StyledMenuItem>
            </StyledMenu>
          </div>
        </TableCell>

        <TableCell className="delete-row">
          <IconButton onClick={deleteTask}>
            <DeleteIcon style={{ color: "red" }} fontSize={"small"} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {editDescriptionState.descriptionClicked ? (
                      <TableCell onClick={handleNameClick}>
                        <TextField
                          id={"change-description-field"}
                          autoFocus={true}
                          style={{ width: "100%" }}
                          onChange={handleDescriptionInput}
                          onKeyPress={handleDescriptionEnter}
                          onKeyDown={handleDescriptionEsc}
                          value={editDescriptionState.description}
                          placeholder={"Opis"}
                        ></TextField>
                      </TableCell>
                    ) : (
                      <TableCell onClick={handleDescriptionClick}>
                        {editDescriptionState.description === ""
                          ? "Dodaj opis"
                          : editDescriptionState.description}
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
