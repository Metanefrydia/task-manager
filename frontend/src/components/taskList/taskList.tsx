import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./taskList.css";
import { IconButton } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TableRowComponent from "./taskListRow";

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

export default function BasicTable() {
  const [state, setState] = React.useState({
    inProgressColor: {
      backgroundColor: "yellow",
      fontWeight: "bold" as "bold",
    },
    doneColor: { backgroundColor: "green", fontWeight: "bold" as "bold" },
    toDoColor: { backgroundColor: "grey", fontWeight: "bold" as "bold" },
    pausedColor: { backgroundColor: "red", fontWeight: "bold" as "bold" },
  });

  const [open, setOpen] = React.useState(false);

  return (
    <TableContainer className="table-main" component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
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
          {rows.map((row) => {
            let style;
            if (row.status === "W trakcie") {
              style = state.inProgressColor;
              console.log("GLÓWNA: " + style);
            } else if (row.status === "Wykonano") {
              style = state.doneColor;
            } else if (row.status === "Do zrobienia") {
              style = state.toDoColor;
            } else {
              style = state.pausedColor;
            }

            return (
              <TableRowComponent key={row.name} {...row} style={style} />
            );
          })}

          {/*  adding row siup */}
          {/*<TableRowComponent name={"+ Dodaj"} person={""} status={""} style={{}} />*/}
          <TableRow>
            <TableCell id={"color"} className="color-rec">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell className="add-row-text">+ Dodaj</TableCell>
            <TableCell className="add-row-text"></TableCell>
            <TableCell className="add-row-text"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
