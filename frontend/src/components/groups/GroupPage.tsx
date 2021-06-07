import React from "react";
import { RouteComponentProps } from "react-router-dom";
import GroupCard from "./GroupCard";
import { useEffect, useState } from "react";
import AuthenticationService from "../../services/service";


interface RouteParams {
    id: string;
}

interface RecipePage extends RouteComponentProps<RouteParams> {}

const RecipePage: React.FC<RecipePage> = (props) => {
    const [group, setData] = useState<any>();

    return(
    <div >
        <GroupCard />

    </div>
    );
};

export default RecipePage;
