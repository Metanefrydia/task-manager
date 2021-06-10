import React from "react";
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
  Typography,
  withStyles,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TableRowComponent from "./taskListRow";

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

const rows = [
  createData("red", "Zakupy", "Tomek", "W trakcie"),
  createData("red", "Pranie", "Oliwia", "Wykonano"),
  createData(
    "red",
    "Wysłanie pocztówek na święta robie długiego stringa szalom",
    "Karolek <3",
    "Do zrobienia"
  ),
  createData("red", "Wypełnienie spisu ludności", "Marysia", "Wstrzymano"),
];

export default function BasicTable(props: { selectedDay: string }) {
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
    rows: rows,
  });

  const [open, setOpen] = React.useState(false);

  const handleAdding = (event: React.MouseEvent<HTMLElement>) => {
    setState({ ...state, editing: true });
  };

  const handleAddButton = (event: React.MouseEvent<HTMLElement>) => {
    state.rows.push(
      createData("red", state.newTask, "undefiend", "Do zrobienia")
    );
    setState({ ...state, editing: false });
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, newTask: event.target.value });
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
        Rodzina
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
          </TableRow>
        </TableHead>

        <TableBody>
          {state.rows.map((row) => {
            let style;
            if (row.status === "W trakcie") {
              style = state.inProgressColor;
            } else if (row.status === "Wykonano") {
              style = state.doneColor;
            } else if (row.status === "Do zrobienia") {
              style = state.toDoColor;
            } else {
              style = state.pausedColor;
            }

            return (
              <TableRowComponent
                key={row.name}
                {...row}
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
              id={"addCell"}
              onClick={handleAdding}
              className="add-row-text"
            >
              {state.editing ? (
                <TextField
                  className="new-task-input"
                  id="standard-basic"
                  placeholder={"Dodaj zadanie"}
                  onChange={handleInput}
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
          </TableRow>

          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h5" gutterBottom component="div">
                    Dodawanie tasku
                  </Typography>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
