import React from "react";
import "./HomePage.css";
import TaskList from "../taskList/taskList";
// @ts-ignore
import DatePicker from "react-horizontal-datepicker";

interface State {
  selectedDay: any;
}

export default function HomePage() {
  const [state, setState] = React.useState<State>({
    selectedDay: "",
  });

  const monthEnum = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const formatDate = (date: string) => {
    const splits = date.split(" ");
    // @ts-ignore
    let parsedDate = splits[3] + "-" + splits[2] + "-" + monthEnum[splits[1]];
  };

  const selectDay = (day: any) => {
    setState({ ...state, selectedDay: day });
    formatDate(String(day));
  };

  return (
    <div>
      <div className="date-container">
        <DatePicker
          getSelectedDay={selectDay}
          endDate={180}
          labelFormat={"yyyy MMMM"}
          color={"#03A9F4"}
        />
      </div>
      <div className="table-container">
        <TaskList {...state} />
      </div>
    </div>
  );
}
