import React, {useEffect, useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./taskList.css";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  TextField,
  withStyles,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TableRowComponent from "./taskListRow";
import TaskService from "../../services/TaskService";

class Task {
  date:string;
  description: string;
  group: string;
  status: string;
  title: string;
  _id: string;

  constructor(date: string, description: string, group: string, status: string, title: string, id: string,){
    this.date = date;
    this.description = description;
    this.group = group;
    this.status = status;
    this.title = title;
    this._id = id;
  }
}

interface Props{
  taskList: Task[];
}

const TableCell = withStyles((theme) => ({
  root: {
    height: 10,
    padding: 3,
    borderColor: "#C8C8C8",
    borderTop: "1px",
  },
}))(MuiTableCell);

function createData(
  color: string,
  name: string,
  person: string,
  status: string
) {
  return { name, person, status };
}

export default function BasicTable(props: any) {
  const [state, setState] = React.useState({
    inProgressColor: {
      backgroundColor: "#FFEF62",
      fontWeight: "bold" as "bold",
      width: "100%",
      color: "black",
    },
    doneColor: {
      backgroundColor: "#33EB91",
      fontWeight: "bold" as "bold",
      width: "100%",
      color: "black",
    },
    toDoColor: {
      backgroundColor: "#CFCFCF",
      fontWeight: "bold" as "bold",
      width: "100%",
      color: "black",
    },
    pausedColor: {
      backgroundColor: "#F1503A",
      fontWeight: "bold" as "bold",
      width: "100%",
      color: "black",
    },
    editing: false,
    newTask: "",
  });

  const [tasks, setTasks] = useState(
      props.taskList.filter((task : any) => {
        return task.group === props.group._id;
      })
  )

  useEffect( () => {
    setTasks(      props.taskList.filter((task : any) => {
      return task.group === props.group._id;
    }));
  }, [props]);

  const [open, setOpen] = React.useState(false);

  const [newTask, setNewTask] = React.useState({
    title: "",
    date: props.date,
    groupId: props.group._id, //TODO tu muszisz przekazać id grupy tego komponentu
    description: "",
  });

  const handleAdding = (event: React.MouseEvent<HTMLElement>) => {
    setState({ ...state, editing: true });
  };

  const handleAddButton = (event: React.MouseEvent<HTMLElement>) => {
    // state.rows.push(
    //   createData("red", state.newTask, "undefiend", "Do zrobienia")
    // );
    setState({ ...state, editing: false });

    const newTaskData = {
      title: newTask.title,
      date: props.date,
      group: newTask.groupId,
      description: newTask.description,
      status: "Do zrobienia",
    };

    // console.log("wysyłka" + newTask.date);
    TaskService.addTask(newTaskData).then((response) => {
      // console.log(response);
      //  constructor(date: string, description: string, group: string, status: string, title: string, id: string,){
    });
    // window.location.reload();
    //TODO nie wiem czy tu powinien być refresz
    // czy inny sposób żeby załadować nowy task,
    // jeżeli inny to trzeba jeszcze wyczyścić stan "newTask"
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, newTask: event.target.value });
  };

  const handleNewTaskChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTask({ ...newTask, [prop]: event.target.value });
    };

  return (
    <TableContainer className="table-main">
      <p
        style={{
          textAlign: "left",
          color: "#f1503a",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {props.group.name}
      </p>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow
            style={{
              height: "auto !important",
              borderTop: "10px",
              borderColor: "yellow",
            }}
          >
            {/* cell z kolorkiem */}
            <TableCell className="color-rec-head"></TableCell>
            <TableCell></TableCell>
            <TableCell className="head-text" align="center">
              Osoba
            </TableCell>
            <TableCell className="head-text" align="center">
              Status
            </TableCell>

            <TableCell>

            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          { tasks.map( (task: any) => {

            let style;
            if (task.status === "W trakcie") {
              style = state.inProgressColor;
            } else if (task.status === "Wykonano") {
              style = state.doneColor;
            } else if (task.status === "Do zrobienia") {
              style = state.toDoColor;
            } else {
              style = state.pausedColor;
            }

            return (
              <TableRowComponent
                key={task.name}
                {...task}
                  tableGroup={props.group}
                style={style}
              ></TableRowComponent>
            );
          })}

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

            <TableCell
              id="addCell"
              onClick={handleAdding}
              className="add-row-text"
            >
              {state.editing ? (
                <TextField
                  className="new-task-input"
                  id="standard-basic"
                  placeholder="Dodaj zadanie"
                  value={newTask.title}
                  onChange={handleNewTaskChange("title")}
                />
              ) : (
                <div style={{ color: "#979797" }}>+ Dodaj</div>
              )}
            </TableCell>

            <TableCell style={{ backgroundColor: "#EDEDED" }}></TableCell>
            <TableCell className="add-row-text">
              {state.editing ? (
                <div className="button-div">
                  <Button
                    id={"menuButton"}
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    style={{ width: "100%", backgroundColor: "#03A9F4" }}
                    onClick={handleAddButton}
                  >
                    DODAJ
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </TableCell>
            <TableCell style={{ backgroundColor: "#EDEDED" }}></TableCell>
          </TableRow>

          <TableRow style={{width: "100%"}}>
            {
              //TODO dąłbyś radę zrobić żeby ten texfield zajmował cały row
              // z marginesami po prae px z obu stron?
            //    JUTRO
            }
            <TableCell style={{ paddingBottom: 0, paddingTop: 0,}} colSpan={5}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1} style={{width: "100%"}}>
                  <TextField
                      style={{width: "100%"}}
                    multiline
                    label="Opis"
                    placeholder="Opis zadania..."
                    value={newTask.description}
                    onChange={handleNewTaskChange("description")}
                    className={"description-input"}
                  />
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
