import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./taskList.css";

// interface State{
//     inProgressColor: ,
//     doneColor: string,
//     toDoColor: string,
//     pausedColor: string,
//
// }

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
    inProgressColor: { backgroundColor: "yellow" },
    doneColor: { backgroundColor: "green" },
    toDoColor: { backgroundColor: "grey" },
    pausedColor: { backgroundColor: "red" },
  });
  const getTaskColor = () => {
    return {
      backgroundColor: "yellow",
    };
  };
  return (
    <TableContainer className="table-main" component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* cell z kolorkiem */}
            <TableCell className="color-rec-head"></TableCell>
            <TableCell></TableCell>
            <TableCell align="center">Osoba</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
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
              <TableRow key={row.name}>
                <TableCell id={"color"} className="color-rec"></TableCell>
                <TableCell id={"name"} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell id={"person"} align="center">
                  {row.person}
                </TableCell>

                <TableCell id={"status"} style={style} align="center">
                  {row.status}
                </TableCell>
              </TableRow>
            );
          })}
          {/*  adding row siup */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
