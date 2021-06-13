import React, {useEffect, useState} from "react";
import "./HomePage.css";
import TaskList from "../taskList/taskList";
// @ts-ignore
import DatePicker from "react-horizontal-datepicker";
import GroupService from "../../services/GroupsService";
import axios from "axios";
import AuthenticationService from "../../services/AuthenticationService";
import TaskService from "../../services/TaskService";

interface State {
  selectedDay: any;
  isReady: boolean;
}

interface Tasks {
  taskList: Task[];
  isLoading: boolean;
  tasksLoaded: boolean;
}

export class Task {
  date:string;
  description: string;
  group: string;
  status: string;
  title: string;
  assignee: string;
  _id: string;
  __v: number;

  constructor(_id: string, title: string, description: string, status: string, date: string, group: string, __v: number, assignee: string){
    this.date = date;
    this.description = description;
    this.group = group;
    this.status = status;
    this.title = title;
    this._id = _id;
    this.__v = __v;
    this.assignee = assignee;
  }
}

export default function HomePage(props: { match: { params: { id: string; }; }; }) {
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
    const parsedDate = splits[3] + "-" + monthEnum[splits[1]] + "-" +  splits[2];
    return parsedDate;
  };

  const [state, setState] = React.useState<State>({
    selectedDay: formatDate(String(new Date())),
    isReady: false,
  });

  const [tasks, setTasks] = React.useState<Tasks>({
    taskList: [] as Task[],
    isLoading: true,
    tasksLoaded: false,
  });

  const [groups, setGroups] = useState<any>();
  const [isLoading, setLoaded] = useState(false);

  const selectDay = (day: any) => {
    const date = formatDate(String(day))
    setState({ ...state, selectedDay: date });
  };

  useEffect( () => {
     TaskService.getTasks(state.selectedDay).then((response) => {
       setTasks({...tasks, taskList: response.data.data, tasksLoaded: true})
      // console.log(response.data.data)
     })
        .catch(e => console.log(e));
  },[state]);

  useEffect(() => {
    const readGroups = () => {
      let id: string = props.match.params.id;
      GroupService.getGroups(id).then((response) => {
        // console.log("GRUPY: " + JSON.stringify(response.data));
        setGroups(response.data);
        setLoaded(true);
        // console.log("GRUPY 2: " + JSON.stringify(groups.data));
        // groups.data.map( (group: { name: any; }) => {
        //   console.log(group.name)
        // })

      });
    };

      readGroups();

  }, [state]);

  // useEffect(() => {
  //   if (tasks.tasksLoaded && isLoading){
  //     setTasks({...tasks, isLoading: false});
  //   }
  // }, [isLoading])

  // console.log(tasks.tasksLoaded + " " + isLoading)

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

        {!(tasks.isLoading && isLoading) ? <div>WYKURWIAJ</div> :
            // <div>jebac</div>
            groups.data.map((group: any) => <TaskList {...tasks} group={group}/> )

        }
      </div>
    </div>
  );
}
