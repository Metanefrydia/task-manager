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
  const [groups, setGroups] = useState<any>();
  const [isLoading, setLoading] = useState(true);

  const readGroups = () => {
    let id: string = props.match.params.id;
    AuthenticationService.getGroups(id).then((response) => {
      console.log(response.data);
      setGroups(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    readGroups();
  }, []);

  return <div>{!isLoading ? <GroupCard {...groups} /> : <p> NI MA </p>}</div>;
};

export default GroupPage;
