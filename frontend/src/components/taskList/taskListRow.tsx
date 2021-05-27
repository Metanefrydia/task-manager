import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {IconButton} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "./taskListRow.css"
import "./taskList.css"

export default function TableRowComponent(props: { name: {} | null | undefined;
    person: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    status: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    style: React.CSSProperties | undefined;}
    ) {
    const [open, setOpen] = React.useState(false);

    // console.log(styleProp)

    return (
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
  );
}
