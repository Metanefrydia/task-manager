import axios from "axios";
import AuthenticationService from "./AuthenticationService";

class GroupsService {
  public async getGroups(userId: string) {
    return axios.get(`/groups/${userId}`, {
      headers: { Authorization: AuthenticationService.getToken() },
    });
  }

  public async deleteGroup(groupId: string) {
    await axios.delete(`/delete-group/${groupId}`, {
      headers: { Authorization: AuthenticationService.getToken() },
    });
  }
  public async addGroup(data: any) {
    await axios.post(
      "/add-group",
      {
        name: data.name,
        members: data.members,
      },
      {
        headers: { Authorization: AuthenticationService.getToken() },
      }
    );
  }

  public async editGroup(data: any) {
    await axios.put(
      `/group/${data._id}`,
      {
        _id: data._id,
        name: data.name,
        members: data.members,
      },
      {
        headers: { Authorization: AuthenticationService.getToken() },
      }
    );
  }
}

export default new GroupsService();
