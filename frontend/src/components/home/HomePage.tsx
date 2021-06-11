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
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
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
