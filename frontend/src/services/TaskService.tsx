import axios from "axios";
import AuthenticationService from "./AuthenticationService";

class TaskService {
  public async getTasks(tasksDate: string) {
    return axios.get(`/tasks/${tasksDate}`, {
      headers: { Authorization: AuthenticationService.getToken() },
    });
  }

  public async addTask(taskData: any) {
    await axios.post(`/add-task`, taskData, {
      headers: { Authorization: AuthenticationService.getToken() },
    });
  }

  public async editTask(taskData: any) {
    const editedTaskData = {
      //TODO uzupełnic dane
    };

    await axios.put(`/task/${taskData.taskId}`, editedTaskData, {
      headers: { Authorization: AuthenticationService.getToken() },
    });
  }

  public async deleteTask(taskId: any) {
    await axios.delete(`/delete-task/${taskId}`, {
      headers: { Authorization: AuthenticationService.getToken() },
    });
  }
}

export default new TaskService();
