import {Link} from "@material-ui/core";
import AuthenticationService from "../../services/AuthenticationService";


export default function NoGroupCard() {
    const userId = AuthenticationService.getUserDetails()?._id;


    return (
    <div>
      <p>Brak Grup. <a href={`/groups/${userId}`}>Utwórz grupę</a> By dodać zadania
      </p>


    </div>
  );
}
