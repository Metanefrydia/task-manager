import React from "react";
import { RouteComponentProps } from "react-router-dom";
import GroupCard from "./GroupCard";
import { useEffect, useState } from "react";
import GroupService from "../../services/GroupsService";

interface RouteParams {
  id: string;
}

interface GroupPageInterface extends RouteComponentProps<RouteParams> {}

const GroupPage: React.FC<GroupPageInterface> = (props) => {
  const [groups, setGroups] = useState<any>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const readGroups = () => {
      let id: string = props.match.params.id;
      GroupService.getGroups(id).then((response) => {
        setGroups(response.data);
        setLoading(false);
      });
    };

    readGroups();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{!isLoading ? <GroupCard {...groups} /> : <p>Ładuję</p>}</div>;
};

export default GroupPage;
