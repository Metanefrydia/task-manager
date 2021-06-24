import React, { useEffect } from "react";
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
  date: string;
  description: string;
  group: string;
  status: string;
  title: string;
  _id: string;

  constructor(
    date: string,
    description: string,
    group: string,
    status: string,
    title: string,
    id: string
  ) {
    this.date = date;
    this.description = description;
    this.group = group;
    this.status = status;
    this.title = title;
    this._id = id;
  }
}

interface Tasks {
  taskList: Task[];
  isLoading: boolean;
  tasksLoaded: boolean;
}

const TableCell = withStyles(() => ({
  root: {
    height: 10,
    padding: 3,
    borderColor: "#C8C8C8",
    borderTop: "1px",
  },
}))(MuiTableCell);

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

  const [tasks, setTasks] = React.useState<Tasks>({
    taskList: [] as Task[],
    isLoading: true,
    tasksLoaded: false,
  });

  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    TaskService.getTasks(props.day)
      .then((response) => {
        setTasks({
          ...tasks,
          taskList: response.data.data.filter((task: any) => {
            return task.group === props.group._id;
          }),
          tasksLoaded: true,
        });
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [isLoading]);

  const [open, setOpen] = React.useState(false);

  const [newTask, setNewTask] = React.useState({
    title: "",
    date: props.date,
    groupId: props.group._id,
    description: "",
  });

  const handleAdding = (event: React.MouseEvent<HTMLElement>) => {
    setState({ ...state, editing: true });
  };

  const handleAddButton = (event: React.MouseEvent<HTMLElement>) => {
    setState({ ...state, editing: false });

    const newTaskData = {
      title: newTask.title,
      date: props.date,
      group: newTask.groupId,
      description: newTask.description,
      status: "Do zrobienia",
    };

    TaskService.addTask(newTaskData).then(() => {
      setNewTask({ ...newTask, title: "" });
      setLoading(true);
    });
  };

  const handleDeleting = () => {
    setLoading(true);
  };

  const handleNewTaskChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTask({ ...newTask, [prop]: event.target.value });
    };

  if (isLoading) {
    return <div></div>;
  } else {
    return (
      <TableContainer className="table-main">
        <p
          style={{
            textAlign: "left",
            color: props.color,
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
              <TableCell className="color-rec-head"></TableCell>
              <TableCell></TableCell>
              <TableCell className="head-text" align="center">
                Osoba
              </TableCell>
              <TableCell className="head-text" align="center">
                Status
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.taskList.map((task: any) => {
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
                  color={props.color}
                  handleDelete={handleDeleting}
                  style={style}
                ></TableRowComponent>
              );
            })}

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

            <TableRow style={{ width: "100%" }}>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={5}
              >
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1} style={{ width: "99%" }}>
                    <TextField
                      style={{ width: "99%" }}
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
}
