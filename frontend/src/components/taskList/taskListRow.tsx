import React, {useEffect, useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  ListItemText,
  TextField,
  Typography,
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
import AuthenticationService, {UserDetails} from "../../services/AuthenticationService";

const TableCell = withStyles((theme) => ({
  root: {
    height: 10,
    padding: 3,
  },
}))(MuiTableCell);

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

// export default function TableRowComponent(props: {
//   name: string;
//   person: string;
//   status: string;
//   style: React.CSSProperties | undefined;
// }) {
export default function TableRowComponent(props: any){
  // console.log("beginining =  " + JSON.stringify(props.group))
  // console.log("beginining =  " + JSON.stringify(props))



  const [buttonState, setButtonState] = React.useState({
    statusText: props.status,
    statusStyle: props.style,
    person: "undefined",
  });

  const [editState, setEditState] = React.useState({
    taskNameClicked: false,
    editted: false,
    taskName: props.title,
  });


  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const [users, setUsers] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [members, setMembers] = React.useState<string[]>([]);
  // const [tasks, setTasks] = React.useState(
  //     props.filter((group: any) => {
  //       return props.group.includes(props.tableGroup)
  //     })
  // )



  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickPerson = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClosePerson = () => {
    setAnchorEl2(null);
  };

  const handlePersonMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setButtonState({ ...buttonState, person: event.currentTarget.id });
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
    }
  };

  const handleNameClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!editState.taskNameClicked) {
      setEditState({ ...editState, taskNameClicked: true });
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

  useEffect( () => {
    const getUserName = () => {
      let membersArr: string[] = [];
      let id: string = props.assignee;
      AuthenticationService.getUsers().then((response) => {
        // console.log(response.data.data);
        setUsers(response.data.data)


        response.data.data.users.map((user: any) => {
          // console.log(user);
          if(user._id === props.assignee){
            setButtonState({...buttonState, person: user.name})
          }

          props.tableGroup.members.map( (member: any) => {
            // console.log(member + ', ' + user._id)

            if (user._id === member){
              membersArr.push(user.name);
              // console.log('if ' + user.name)

            }
          });

        });

        setMembers(membersArr);

        console.log(props.group);
        setLoading(false);
      })
    }

    getUserName();

  }, [])


  return (
      isLoading ? <div>ładowanie</div> :
    <>
      <TableRow className="row">
        <TableCell id={"color"} className="color-rec">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {editState.taskNameClicked ? (
          <TableCell onClick={handleNameClick}>
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
            style={{ width: "100%" }}
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


            {
              members.map((member: any) => <MenuItem id={member} onClick={handlePersonMenuClick}>
              {member}
            </MenuItem>)}

                {/*<MenuItem id={"Andżej"} onClick={handlePersonMenuClick}>*/}
                {/*  Andżej*/}
                {/*</MenuItem>*/}
                {/*<MenuItem id={"Sebek"} onClick={handlePersonMenuClick}>*/}
                {/*  Sebek*/}
                {/*</MenuItem>*/}
                {/*<MenuItem id={"Karyna"} onClick={handlePersonMenuClick}>*/}
                {/*  Karyna*/}
                {/*</MenuItem>*/}
              </Menu>
        </TableCell>

        <TableCell id={"status"} align="center">
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
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h5" gutterBottom component="div">
                Historyyy
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Placeholder</TableCell>
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
