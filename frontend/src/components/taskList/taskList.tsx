import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
import MuiTableCell from '@material-ui/core/TableCell';
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./taskList.css";
import {Box, Collapse, IconButton, Typography, withStyles} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TableRowComponent from "./taskListRow";

const TableCell = withStyles(theme => ({
  root: {
    height: 10,
    padding:3,
    borderColor: '#C8C8C8',
    borderTop: "1px",
  }
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

export default function BasicTable() {
  const [state, setState] = React.useState({
    inProgressColor: {
      backgroundColor: "#FFEF62",
      fontWeight: "bold" as "bold",
    },
    doneColor: { backgroundColor: "#33EB91", fontWeight: "bold" as "bold" },
    toDoColor: { backgroundColor: "#CFCFCF", fontWeight: "bold" as "bold" },
    pausedColor: { backgroundColor: "#F1503A", fontWeight: "bold" as "bold" },
  });

  const [open, setOpen] = React.useState(false);

  return (
    <TableContainer className="table-main" component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow style={{ height: 'auto !important', borderTop: '10px', borderColor: 'yellow' }}>
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
                <TableRowComponent key={row.name} {...row} style={style} ></TableRowComponent>
            );
          })}

          {/*  adding row siup */}
          {/*<TableRowComponent name={"+ Dodaj"} person={""} status={""} style={{}} />*/}
          <TableRow style={{ height: '10px !important' }} >
            <TableCell id={"color"} className="color-rec">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell className="add-row-text"><div style={{ color: "#979797" }}>+ Dodaj</div></TableCell>
            <TableCell className="add-row-text"></TableCell>
            <TableCell className="add-row-text"></TableCell>
          </TableRow>




          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    Historyyy
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Total price ($)</TableCell>
                      </TableRow>
                    </TableHead>
                    {/*<TableBody>*/}
                    {/*  {row.history.map((historyRow) => (*/}
                    {/*      <TableRow key={historyRow.date}>*/}
                    {/*        <TableCell component="th" scope="row">*/}
                    {/*          {historyRow.date}*/}
                    {/*        </TableCell>*/}
                    {/*        <TableCell>{historyRow.customerId}</TableCell>*/}
                    {/*        <TableCell align="right">{historyRow.amount}</TableCell>*/}
                    {/*        <TableCell align="right">*/}
                    {/*          {Math.round(historyRow.amount * row.price * 100) / 100}*/}
                    {/*        </TableCell>*/}
                    {/*      </TableRow>*/}
                    {/*  ))}*/}
                    {/*</TableBody>*/}
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>


        </TableBody>
      </Table>
    </TableContainer>
  );
}
