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
  public async addGroup(groupData: any) {
    await axios.post(
      "/add-group",
      {
        name: groupData.name,
        members: groupData.members,
      },
      {
        headers: { Authorization: AuthenticationService.getToken() },
      }
    );
  }

  public async editGroup(groupData: any) {
    await axios.put(
      `/group/${groupData._id}`,
      {
        _id: groupData._id,
        name: groupData.name,
        members: groupData.members,
      },
      {
        headers: { Authorization: AuthenticationService.getToken() },
      }
    );
  }
}

export default new GroupsService();
