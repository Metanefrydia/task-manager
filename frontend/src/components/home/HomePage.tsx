import React, { useEffect, useState } from "react";
import "./HomePage.css";
import TaskList from "../taskList/taskList";
// @ts-ignore
import DatePicker from "react-horizontal-datepicker";
import GroupService from "../../services/GroupsService";

interface State {
  selectedDay: any;
  isReady: boolean;
}

export default function HomePage(props: { match: { params: { id: string } } }) {
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

  const colorsEnum = [
    "#F1503A",
    "#5D72E5",
  ]

  const formatDate = (date: string) => {
    const splits = date.split(" ");
    // @ts-ignore
    const parsedDate = splits[3] + "-" + monthEnum[splits[1]] + "-" + splits[2];
    return parsedDate;
  };

  const [state, setState] = React.useState<State>({
    selectedDay: formatDate(String(new Date())),
    isReady: false,
  });

  const [groups, setGroups] = useState<any>();
  const [isLoading, setLoaded] = useState(false);

  const selectDay = (day: any) => {
    const date = formatDate(String(day));
    setState({ ...state, selectedDay: date });
    setLoaded(false);
  };

  useEffect(() => {
    const getData = () => {
      let id: string = props.match.params.id;
      GroupService.getGroups(id).then((response) => {
        setGroups(response.data);
        setLoaded(true);
      });
    };
    getData();
  }, [state, props.match.params.id]);

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
        {!isLoading ? (
          <div>ładowanie</div>
        ) : (
          groups.data.map((group: any, idx: number) => (
            <TaskList
              key={group.id}
              day={state.selectedDay}
              color={colorsEnum[idx % 2]}
              group={group}
              date={state.selectedDay}
            />
          ))
        )}
      </div>
    </div>
  );
}
