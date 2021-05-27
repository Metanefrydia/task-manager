import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {
    Box,
    Collapse,
    IconButton, Typography,
    withStyles
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "./taskListRow.css"
import "./taskList.css"
import MuiTableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";

const TableCell = withStyles(theme => ({
    root: {
        height: 10,
        padding:3,
        // margin: "10px 0px 10px 0px",
        // marginTop: 10,
        // paddingTop: 10,
        // borderSpacing: '0 5px',
        // borderCollapse: 'separate',
        // border-spacing: 0px 50px,
    }
}))(MuiTableCell);

export default function TableRowComponent(props: { name: {} | null | undefined;
    person: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    status: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    style: React.CSSProperties | undefined;}
    ) {
    const [open, setOpen] = React.useState(false);
    // console.log(styleProp)

    return (
        <>
      <TableRow className="row" >
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
              id={"name"}
              className="task-text"
              component="th"
              scope="row"
          >
              {props.name}
          </TableCell>
          <TableCell id={"person"} className="person-text" align="center">
              {props.person}
          </TableCell>

          <TableCell id={"status"} style={props.style} align="center">
              {props.status}
          </TableCell>
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
            </>

  );
}
