import React from "react";
import { RouteComponentProps } from "react-router-dom";
import GroupCard from "./GroupCard";
import { useEffect, useState } from "react";
import AuthenticationService from "../../services/service";

interface RouteParams {
  id: string;
}

interface GroupPage extends RouteComponentProps<RouteParams> {}

const GroupPage: React.FC<GroupPage> = (props) => {
  const [group, setData] = useState<any>();

  useEffect(() => {
    const readGroups = () => {
      let id: string = props.match.params.id;
      AuthenticationService.getGroups(id)
    };
    readGroups();
  }, []);

  return (
    <div>
      <GroupCard />
    </div>
  );
};

export default GroupPage;
