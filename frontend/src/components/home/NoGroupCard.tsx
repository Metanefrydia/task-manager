import {Link} from "@material-ui/core";
import AuthenticationService from "../../services/AuthenticationService";
import "./NoGroupCardStyle.css"

export default function NoGroupCard() {
    const userId = AuthenticationService.getUserDetails()?._id;


    return (
    <div className="to-group-link-container">
      <p className="to-group-link-des">Brak Grup.</p>
        <p className="to-group-link-des"><a href={`/groups/${userId}`} className="to-group-link">Utwórz grupę</a> by dodać zadania</p>


    </div>
  );
}
